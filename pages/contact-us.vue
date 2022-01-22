<template>
  <div class="contact-page pa-4">
    <v-container class="py-4 px-0 px-lg-10">
      <client-only>
      <v-row ustify="center" class="pb-6" justify="center">
        <v-col cols="12" class="text-center text-h5 pb-0 primary--text font-weight-bold">
          Contact Us
        </v-col>
         <v-col cols="12" class="text-center text-body-2">
           <span class="font-weight-bold">Questions, bug reports, feedback, feature-requests - we're here for it all.</span>
           <br />
           We'd like to hear from you, write to us in the below form.
        </v-col>
        <v-col cols="12" md="7">
          <v-card>
            <v-container fluid>
              <v-form class="px-3 pb-3">
                <v-text-field
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                  :counter="14"
                  required
                  name="Name"
                ></v-text-field>
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                  name="Email"
                ></v-text-field>
                <v-textarea
                  label="Message"
                  v-model="message"
                  :rules="messageRules"
                  required
                  name="Message"
                ></v-textarea>
                <v-btn
                  color="primary"
                  @click="submit"
                  :disabled="!valid || processing"
                >submit</v-btn>
            </v-form>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      </client-only>
    </v-container>
     <v-snackbar
      v-model="snackbar"
    >
      {{ snackbar_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  components: {
  },
  computed: {
   valid() {
     if(!this.name)
      return false;
     if(!this.message || this.message.length < 10)
      return false;
     if(!this.email || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)))
      return false;
     return true
    }
  },
  data() {
    return {
      processing: false,
      snackbar: false,
      snackbar_text: '',
      name: '',
      nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 14 || 'Name must be less than 14 characters'
        ],
      email: '',
      emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      messageRules: [
          (v) => !!v || 'Message is required',
          (v) =>  v.length >= 10 || 'Message must be more than 10 characters'
      ],
      message: ''
    }
  },
  methods:{
    async submit(){
      try{
      this.processing = true;
      this.snackbar = false;
      await this.$mail.send({
        from: this.email,
        subject: `Contact Form | ${this.name}` ,
        text: this.message,
      })
      this.snackbar_text = 'Thank You for reaching out to us!'
      }catch(err){
       this.snackbar_text = 'Failed to send email! Write to us at contact@adventurespedia.com'
      }finally{
        this.snackbar= true;
        this.processing = false;
        this.clearForm()
      }
    },
    clearForm(){
      this.email = '';
      this.message = '';
      this.name = '';
    }
  },
  head(){
    const title = `${this.$store.state.config.site_title} | Contact`;
    const description = 'Get in touch with us at AdventuresPedia'
    return this.$seo(title, description, this.$route.path);
  },
};
</script>
<style lang="scss">
.contact-page {
}
</style>

