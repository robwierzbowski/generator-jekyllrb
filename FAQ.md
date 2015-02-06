# Frequently Asked Questions

#### I'm working on a github project page, and my css is not working - [issue #134]
[issue #134]: https://github.com/robwierzbowski/generator-jekyllrb/issues/134

Please make sure that you have looked at [the jekyll configuration](http://jekyllrb.com/docs/configuration/).
One setting you may want to use for project pages is `baseurl: /name-of-github-project`.

#### Can there be a version using `gulp`? - [issue #116]
[issue #116]: https://github.com/robwierzbowski/generator-jekyllrb/issues/116

There actually is; check out [issue #116] for more info. If you are interested in helping merge the projects
and have this generator do either `grunt` or `gulp`, pull requests are welcome.

#### What about `libsass`? - [issue #116]

See [issue #116] as well.

#### `scss-lint` does not work out of the box, why? - [issue #130]
[issue #130]: https://github.com/robwierzbowski/generator-jekyllrb/issues/130

`main.scss` that is included why `jekyll` is not pure scss format. It includes [front matter], which makes it
an invalid `.scss` file. See the discussion on [jekyll #3408](https://github.com/jekyll/jekyll/issues/3408) if
you want to know more.


[front matter]: http://jekyllrb.com/docs/assets/
