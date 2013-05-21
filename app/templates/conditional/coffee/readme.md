# Get caffienated!

Grunt handles all <%= jsPre %> configuration. You can configure compiler settings in the project's Gruntfile.js.

There may be boilerplate javascript files in `app/<%= jsDir %>`. Move or delete them to avoid collision.

For detailed information on configuring <%= jsPre %> with Grunt, see the docs at <% if (jsPre === 'coffeescript') { %>https://github.com/gruntjs/grunt-contrib-coffee<% } %>.

