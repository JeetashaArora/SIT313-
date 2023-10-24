import { useState } from 'react'
//Creating an array for different array
const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']
//This function accepts a prop that is the new filter
export default function ProjectFilter({ changeFilter }) {
    //using a state variable for keeping track of filter
    const [currentFilter, setCurrentFilter] = useState('all')

    //Creating an event handler function to change the filter
    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
        changeFilter(newFilter)
    }
    //returning the template
    return (
        <div className="project-filter">
            <nav>
                <p>Filter by: </p>
                {filterList.map((f) => (
                    <button key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >{f}</button>
                ))}
            </nav>
        </div>
    )
}