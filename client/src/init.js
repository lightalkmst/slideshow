import green_curry from 'green_curry'
green_curry (['globalize', 'short F.c'])

import Snabbdom from 'snabbdom-pragma';
global.Snabbdom = Snabbdom

import * as dom from '@cycle/dom';
for (let k in dom) {
  global [k] = dom [k]
}

global.base_url = 'http://localhost:3000'