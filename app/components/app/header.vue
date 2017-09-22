<template>
  <nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <nuxt-link class="navbar-brand exotic--dark" to="/">BSA Lab</nuxt-link>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
        <ul class="nav navbar-nav">
          <li class="active">
            <nuxt-link to="/">Home</nuxt-link>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"
               role="button" aria-haspopup="true" aria-expanded="false">Services <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li class="dropdown-header">Nav header</li>
              <li><a href="#">Separated link</a></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
          <li>
            <nuxt-link to="/bootstrap">Bootstrap</nuxt-link>
          </li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>

<script>
  export default {

  }
</script>
