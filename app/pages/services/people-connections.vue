<template>
  <section class="container">
    <!-- Page Title and description -->
    <div class="text-center">
      <h2>{{ title }}</h2>
      <p class="lead">{{ description }}</p>
    </div>
    <!-- Short description -->
    <div class="bs-callout-info bs-callout">
      <h4>Method: people.connections.list</h4>
      <p>
        Provides a list of the authenticated user's contacts merged with any connected profiles.
        The request throws a 400 error if 'personFields' is not specified.
      </p>
      <h4>HTTP request</h4>
      <p><code>GET https://people.googleapis.com/v1/{resourceName=people/*}/connections</code></p>
      <p>The URL uses <a href="https://github.com/googleapis/googleapis/blob/master/google/api/http.proto"
                         target="_blank">Google API HTTP annotation</a> syntax.</p>

      <p class="lead">Details can be found <a
        href="https://developers.google.com/people/api/rest/v1/people.connections/list"
        target="_blank">here</a>.</p>
    </div>
    <!-- Page content -->
    <div class="jumbotron well">
      <button type="button" class="btn btn-primary" @click="showPeopleMyConnections">Show My Connections</button>
      <div id="content" class="lead" v-show="isShow">
        <p class="lead">Connections:</p>
        <ul>
          <li v-for="connection in google.people_my.connections">{{ connection }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    middleware: 'authenticated',
    data: function () {
      return {
        title: 'Method: people.connections.list',
        description: 'Provides a list of the authenticated user\'s contacts',
        isShow: false
      }
    },
    head () {
      return {
        title: this.title,
        meta: [
          {hid: 'description', name: 'description', content: this.description}
        ]
      }
    },
    computed: {
      ...mapGetters({
        google: 'getGoogleData',
      })
    },
    methods: {
      showPeopleMyConnections: function () {
        this.isShow = true
        this.$store.dispatch('receivePeopleMyConnections')
      }
    }
  }
</script>
