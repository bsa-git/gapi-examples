<template>
  <section>

    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>

    <div class="bs-callout-info bs-callout">
      <h4>Google Gmail API</h4>
      <p>
        The Gmail API is a RESTful API that can be used to access Gmail mailboxes and send mail.
        For most web applications (including mobile apps), the Gmail API is the best choice for authorized access to a user's Gmail data.
      </p>
      <p>The Gmail API gives you flexible, RESTful access to the user's inbox, with a
        natural interface to
        <a href="https://developers.google.com/gmail/api/v1/reference/users/threads"  target="_blank"><code>Threads</code></a>,
        <a href="https://developers.google.com/gmail/api/v1/reference/users/messages"  target="_blank"><code>Messages</code></a>,
        <a href="https://developers.google.com/gmail/api/v1/reference/users/labels"  target="_blank"><code>Labels</code></a>,
        <a href="https://developers.google.com/gmail/api/v1/reference/users/drafts"  target="_blank"><code>Drafts</code></a>,
        <a href="https://developers.google.com/gmail/api/v1/reference/users/history"  target="_blank"><code>History</code></a>, and.
        <a href="https://developers.google.com/gmail/api/v1/reference/users/settings"  target="_blank"><code>Settings</code></a>.
        From the modern language of your choice, your app can use the API to add
        Gmail features like:</p>
      <ul>
        <li>Read messages from Gmail</li>
        <li>Send email messages</li>
        <li>Modify the labels applied to messages and threads</li>
        <li>Search for specific messages and threads</li>
        <li>Create filters to automatically label, forward, or archive messages</li>
      </ul>
      <p>All you need to use the Gmail API is the
        <a href="https://developers.google.com/gmail/api/downloads" target="_blank">client library</a> for your choice of language and an app
        that can <a href="https://developers.google.com/gmail/api/auth/about-auth"  target="_blank">authenticate</a> as a Gmail user.</p>
      <p class="lead">Details can be found <a href="https://developers.google.com/gmail/api/guides/" target="_blank">here</a>.
      </p>
    </div>

    <div class="jumbotron">
      <p class="lead">Examples:</p>
      <dl>
        <dt>Google Gmail API</dt>
        <dd>
          <nuxt-link to="/services/gmail-display-inbox">Gmail Display Inbox</nuxt-link> - Lists the messages in the user's mailbox.
        </dd>
      </dl>
    </div>
  </section>
</template>

<script>
  export default {
    data: function () {
      return {
        title: 'Google Gmail API',
        description: 'Read and send messages, work with labels, and search for specific threads.'
      }
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ],
        link: []
      }
    }
  }
</script>
