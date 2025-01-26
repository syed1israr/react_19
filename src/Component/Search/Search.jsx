import { HiSearch } from "react-icons/hi"

// eslint-disable-next-line react/prop-types
const Search = ({SearchTerm,setSearchTerm}) => {
  return (
    <>
       <div className="search">
        <div>
          <HiSearch className="text-white text-4xl"/>
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