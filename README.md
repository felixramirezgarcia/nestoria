# nestoria

This program could run different environments:

- Production

```bash
$ npm run build && npm start
```

- Development

```bash
$ npm run build && npm run dev
```

### Generate places

Each time you want to add new places to `data/places.txt` to increment the crawl possibilities you should execute for convinience the next script.

```
$ ./scripts/add_place.sh my-new-place
```

### Tests

The tests are distributed along the folders close each file to test. You can select the subset of test to run simply:

```
$ npx jest src
$ npx jest src/lib
```
