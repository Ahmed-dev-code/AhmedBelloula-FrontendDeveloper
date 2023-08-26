import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from './Popup';



const DataExplore = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
      setIsPopupOpen(true);
    };
  
    const closePopup = () => {
      setIsPopupOpen(false);
    };

    const columns = [
        { field: 'id', headerName: 'Serial', width: 120 },
        { field: 'status', headerName: 'Status', width: 145},
        { field: 'type', headerName: 'Type', width: 125 },
        { field: 'landings', headerName: 'Landings', width: 145 },
    ];
    const [rows, setRows] = useState([]);

    // fetch data form ('https://api.spacexdata.com/v4/capsules') and display it in the table
    const [capsulesData, setCapsulesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://api.spacexdata.com/v3/capsules');
            const newData = response.data; // Storing fetched data in a variable
            setCapsulesData(newData); // Updating the state
            console.log(newData); // Logging the fetched data
            const newRowData = newData.map((capsule) => {
                return {
                    id: capsule.capsule_serial,
                    status: capsule.status,
                    type: capsule.type,
                    landings: capsule.landings,
                };
            });
            setRows(newRowData); // Updating the rows state with transformed data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

      const [filter, setFilter] = useState({status: 'all', landings: -1, type: 'all'});

      const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFilter = (e) => {
        console.log(filter)
        e.preventDefault();
        const { status, landings, type } = filter;
        let filteredData = capsulesData;
        if (status !== 'all') {
            filteredData = filteredData.filter((capsule) => capsule.status == status);
        }
        if (landings != -1) {
            filteredData = filteredData.filter((capsule) => capsule.landings == landings);
        }
        if (type !== 'all') {
            filteredData = filteredData.filter((capsule) => capsule.type === type);
        }
        const newRowData = filteredData.map((capsule) => {
            return {
                id: capsule.capsule_serial,
                status: capsule.status,
                type: capsule.type,
                landings: capsule.landings,
            };
        });
        setRows(newRowData);
    };

    const [selectedCapsule, setSelectedCapsule] = useState({});
    const handleRowClick = (e) => {
        const { id } = e.row;
        const selectedCapsule = capsulesData.find((capsule) => capsule.capsule_serial === id);
        setSelectedCapsule(selectedCapsule);
        openPopup();
    };

    return ( 
        <section id='explore' className="gallery py-14 px-6  bg-slate-900 ">
            <header className="text-center mb-8">
                <h2 className="text-5xl font-bold ">Explore Capsules</h2>
                <p className="text-gray-400 text-lg">Browse through our gallery of capsules and discover insights about each one.</p>
            </header>
            <form action="">
                {/* <h3>
                    Filter Capsules by :
                </h3> */}
                <div className="flex flex-col mb-6 md:flex-row justify-center items-start gap-3 p-3">
                    <div className="flex  justify-between items-center">
                        <label htmlFor="status" className="mr-2  w-16">Status :</label>
                        <select name="status" id="status" className="bg-purple-700 rounded text-white px-2 py-2 w-32" onChange={handleFilterChange}> 
                            <option value="all">All</option>
                            <option value="active">active</option>
                            <option value="retired">retired</option>
                            <option value="unknown">unknown</option>
                            <option value="destroyed">destroyed</option>

                        </select>
                    </div>
                    <div className="flex justify-between items-center ">
                        <label htmlFor="launch" className="mr-2 w-20">Landings :</label>
                        <input type="number" name="landings" id="landings" className="bg-purple-700 rounded text-white px-2 py-2 w-32" placeholder='Total' onChange={handleFilterChange} />
                        
                    </div>
                    <div className="flex  justify-between items-center">
                        <label htmlFor="type" className="mr-2 w-16">type :</label>
                        <select name="type" id="type" className="bg-purple-700 rounded text-white px-2 py-2 w-32" onChange={handleFilterChange }>
                            <option value="all">All</option>
                            <option value="Dragon 1.0">Dragon 1.0</option>
                            <option value="Dragon 1.1">Dragon 1.1</option>
                            <option value="Dragon 2.0">Dragon 2.0</option>
                        </select>
                    </div>
                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 sm:mt-0" onClick={handleFilter}>Filter
                    </button>
                </div>

            </form>
            <DataGrid rows={rows} columns={columns} className= " bg-purple-700    lg:w-4/12  lg:ml-auto lg:mr-auto" initialState={{
                pagination: { paginationModel: { pageSize: 5 } },}}
                onRowClick={handleRowClick}
                sx={
                    {
                        '& .MuiDataGrid-cell': {
                            color: 'white',
                            // bold
                            fontWeight: 'bold',
                        },

                    }
                }

            />
                  <Popup isOpen={isPopupOpen} onClose={closePopup} >
                        {/* include all the capsule information */}
                        <div className="container flex flex-col gap-8">
                            
                        <h2 className="text-3xl font-bold text-white text-center">Capsule {selectedCapsule.capsule_serial} </h2>
                        <div className="  text-lg flex flex-col lg:flex-row justify-center lg:justify-evenly items-start gap-3">
                            <div className="col  lg:text-xl flex flex-col gap-3">
                            <p className="text-purple-800 font-bold">Capsule Id : <span className='  text-purple-300'>{selectedCapsule.capsule_id}</span></p>
                            <p className="text-purple-800 font-bold">Status : <span className='  text-purple-300'>{selectedCapsule.status}</span></p>
                            <p className="text-purple-800 font-bold">Original launch : <span className='  text-purple-300'>{selectedCapsule.original_launch}</span></p>                            
                            <p className="text-purple-800 font-bold">Original launch Unix : <span className='  text-purple-300'> {selectedCapsule.original_launch_unix}</span></p>  
                            {/* the missions is an object with name and flight, get the data and show it in a propriate way */}
                            <p className="text-purple-800 font-bold">Missions : <span className=' text-black'>{selectedCapsule.missions ? selectedCapsule.missions.map((mission) => {
                                return (
                                    <div>
                                        <p className="text-purple-600 ml-1 font-bold">Name : <span className='  text-purple-300'>{mission.name}</span></p>
                                        <p className="text-purple-600 ml-1 font-bold">Flight : <span className='  text-purple-300'>{mission.flight}</span></p>
                                    </div>
                                );
                            }) : 'No missions'}</span></p>
                            </div>
                            <div className=' col lg:text-xl flex flex-col gap-3'>

                            <p className="text-purple-800 font-bold">Type : <span className='  text-purple-300'>{selectedCapsule.type}</span></p>
                            <p className="text-purple-800 font-bold">Landings : <span className='  text-purple-300'>{selectedCapsule.landings}</span></p>
                            <p className="text-purple-800 font-bold">Details : <span className='  text-purple-300'>{selectedCapsule.details}</span></p>
                            <p className="text-purple-800 font-bold">Reuse count : <span className='  text-purple-300'>{selectedCapsule.reuse_count}</span></p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center  ">
                            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-9 rounded" onClick={closePopup}>Close</button>
                        </div>
                                        </div>
                    </Popup>
        </section>
        
    );
}
 
export default DataExplore;