import { useFilters } from "../contexts/FilterContext"

const Sidebar = () => {
 const {filterState : {rateBy, sortBy , showCodOnly ,price} , dispatchFilters} = useFilters();
  return (
    <aside className='sidebar'>
        <button type = "button" className='btn btn-secondary mb-2' onClick={() => dispatchFilters({type: "CLEAR_ALL_FILTERS"})}> Clear all filters</button>
        <input onChange={(e) => dispatchFilters({type : "FILTER_BY_PRICE" , payload : e.target.value})} type="range" className="form-range mt-3" min="500" max="5000" step={500} value={price} id="customRange2" /> <span className="filter-price">{price}</span>
        <section className='rating-section'>
            <h6 className='fw-bold mb-3'>Rating</h6>
            <div>
                <input onChange={()=> dispatchFilters({type : "FILTER_BY_RATING" , payload : 4})} id="4_stars_and_above"  name= "rating" value="4_stars_and_above" type='radio' checked = {rateBy && rateBy === 4} />
                <label for = "4_stars_and_above"> 4 stars and above </label>
            </div>
            <div>
                <input id="3_stars_and_above" name= "rating" value= "3_stars_and_above" type='radio' onChange={()=> dispatchFilters({type : "FILTER_BY_RATING" , payload : 3})} checked = {rateBy && rateBy === 3} />
                <label for = "3_stars_and_above"> 3 stars and above </label>
            </div>
            <div>
                <input id="2_stars_and_above" onChange={()=> dispatchFilters({type : "FILTER_BY_RATING" , payload : 2})} name= "rating" type='radio' value= "2_stars_and_above" checked = {rateBy && rateBy === 2} />
                <label for = "2_stars_and_above"> 2 stars and above </label>
            </div>
            <div>
                <input id="1_stars_and_above" onChange={()=> dispatchFilters({type : "FILTER_BY_RATING" , payload : 1})} name= "rating" type='radio' value= "1_stars_and_above" checked = {rateBy && rateBy === 1} />
                <label for = "1_stars_and_above"> 1 star and above </label>
            </div>
        </section>
        <section className='service-section'>
        <h6 className='fw-bold mb-3'>Services</h6>
            <div>
                <input id="cod"  name= "cod" type='checkbox' className='larger'  checked = {showCodOnly} onClick={() => dispatchFilters({type : "SHOW_COD_ONLY"})} />
                <label for = "cod"> Show COD Only </label>
            </div>
        </section>
        <section className='rating-section'>
            <h6 className='fw-bold mb-3 mt-3'>Sort by price</h6>
            <div>
                <input id="low_to_high" onChange={() => dispatchFilters({type: "SORT_BY_PRICE" , payload : "LOW_TO_HIGH"})} checked = {sortBy && sortBy === "LOW_TO_HIGH"} name= "sorting" type='radio' />
                <label for = "low_to_high"> Price low to high </label>
            </div>
            <div>
                <input id="high_to_low" onChange={() => dispatchFilters({type: "SORT_BY_PRICE" , payload : "HIGH_TO_LOW"})} checked = {sortBy && sortBy === "HIGH_TO_LOW"}  name= "sorting" type='radio' />
                <label for = "high_to_low"> Price high to low </label>
            </div>
        </section>
    </aside>
  )
}

export default Sidebar