import _ from "lodash"; //util fns for pagination

//client side pagination (not server side)
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; //calc startIndex of items in array to be rendered on page

  return _(items) //_(items)convert array to loadash object (wrapper) -> can chain methods
    .slice(startIndex) //.slice (cut items array at startIndex)
    .take(pageSize) //  .take(pageSize) grab pageSize # of items
    .value(); //-> .value returns regular array
}
