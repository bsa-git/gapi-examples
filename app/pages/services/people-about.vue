<template>
  <section>

    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>

    <div class="bs-callout-info bs-callout">
      <h4>Google People API</h4>
      <p>
        The People API lets you list and manage the authenticated user's
        <a href="https://www.google.com/contacts" target="_blank">Contacts</a> and retrieve profile information for
        authenticated users and their contacts.
      </p>
      <p>
        For example, suppose that the authenticated user, Jen, has Fabian and Ranjith in
        her private contacts. When your app calls
        <a
          href="https://developers.google.com/people/api/rest/v1/people.connections/list" target="_blank"><code>people.connections.list</code></a>
        to retrieve a
        list of her connections, Jen is presented with a consent screen asking to give
        the app access to the list. If Jen consents, the app retrieves a list containing
        <a href="https://developers.google.com/people/api/rest/v1/people" target="_blank"><code>person resources</code></a>
        for Fabian and Ranjith.
      </p>
      <p>
        If the app needs information for a specific person, it can then call
        <a href="https://developers.google.com/people/api/rest/v1/people/get"
           target="_blank"><code>people.get</code></a>, passing in a resource name, to get
        the <a href="https://developers.google.com/people/api/rest/v1/people"
               target="_blank"><code>person resource</code></a>
        for that person.
      </p>
      <p>
        The app can also manage contacts by creating new contacts using
        <a
          href="https://developers.google.com/people/api/rest/v1/people/createContact" target="_blank"><code>people.createContact</code></a>, update existing
        contacts it has retrieved from
        <a
          href="https://developers.google.com/people/api/rest/v1/people.connections/list" target="_blank"><code>people.connections.list</code></a>
        using
        <a
          href="https://developers.google.com/people/api/rest/v1/people/updateContact" target="_blank"><code>people.updateContact</code></a>, and delete contacts
        using <a
        href="https://developers.google.com/people/api/rest/v1/people/deleteContact" target="_blank"><code>people.deleteContact</code></a>.
      </p>
      <p class="lead">Details can be found <a href="https://developers.google.com/people/" target="_blank">here</a>.</p>
    </div>

    <div class="jumbotron">
      <p class="lead">Examples:</p>
      <dl>
        <dt>Google People API</dt>
        <dd><nuxt-link to="/services/people-get">People.get</nuxt-link> - Provides information about a person by specifying a resource name.</dd>
        <dd><nuxt-link to="/services/people-connections">People.connections.list</nuxt-link> - Provides a list of the authenticated user's contacts.</dd>
      </dl>
    </div>
  </section>
</template>

<script>
  export default {
    data: function () {
      return {
        title: 'Google People API',
        description: 'Provides access to information about profiles and contacts.'
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
