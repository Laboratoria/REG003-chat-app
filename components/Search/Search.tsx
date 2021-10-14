import { NextPage } from 'next';

const onSearch = (value:any) => {
  console.log(value)
};
const SearchSide: NextPage = () => {
  return(
<section className="container-search">
  <input type="text" className="input-search" placeholder="Buscar" onChange={onSearch}  />
</section>)
}
export default SearchSide