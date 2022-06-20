import htmlToFormattedText from "html-to-formatted-text";

export default ({ app }, inject) => {
  inject('seo', function(
    t,
    desc,
    canonical,
    metaTags
  ) {
    const baseUrl = app.store.state.config.site_url;
    const link = [{ rel: 'canonical', href: `${baseUrl}${canonical}` }];
    const image_url = app.store.state.config.site_logo
    let title = htmlToFormattedText(t.replace(/\&\#8217\;/g, "'"));
    let description = htmlToFormattedText(desc.replace(/\&\#8217\;/g, "'"));
    return {
      title,
      link,
      meta: [
        { hid: 'title', name: 'title', content: title },
        { hid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: title },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image_url },
        { hid: 'twitter:image', name: 'twitter:image', content: image_url },
        ...((metaTags && metaTags) || []),
      ],
    };
  });
};
