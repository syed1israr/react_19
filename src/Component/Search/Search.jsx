
// eslint-disable-next-line react/prop-types
const Search = ({SearchTerm,setSearchTerm}) => {
  return (
    <>
       <div className="search">
        <div>
            <img src="../public/search.svg" alt="search" />
            <input
             type="text"
             placeholder="Search Through Movies" 
             value={SearchTerm}
             onChange={(e)=>setSearchTerm(e.target.value)} 
              />
        </div>
       </div>
    
    </>
  )
}

export default Search