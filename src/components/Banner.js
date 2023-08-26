import Astronaut from '../images/Astronaut.jpg';
import wave from '../images/wave.svg';

const Banner = () => {
    return ( 
        <section className="banner  lg:pt-28  pt-24 mb-28 lg:mb-44 ">
            <div className="  container lg:ml-7 lg:flex flex-row-reverse  justify-between items-center">

            <aside className=" lg:w-5/12 ">
                <img src={Astronaut} alt="" className=""/>
            </aside>
            <main className=' sm: px-5 mt-20  lg:w-6/12 '>
                <h2 className=" lg:text-5xl " >
                Journey Beyond Earth:  Capsules Exploration at Your Fingertips.
                </h2>
                <p className=' text-gray-400'>
                Explore the cosmos of capsule data with our cutting-edge app. Discover insights about space capsules, search by status, launch, and type. Your window to the universe awaits.
                </p>
                <a href='#explore' className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded  lg:mt-9 mt-3 block  w-24">
                    Explore
                </a>
            </main>
            </div>
            {/* <img src={wave} alt="" className=" "/> */}
        </section>
    );
}
 
export default Banner;