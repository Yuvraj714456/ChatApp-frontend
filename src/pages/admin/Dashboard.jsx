import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdAdminPanelSettings } from "react-icons/md";
import AdminLayout from '../../components/Layout/AdminLayout';
import { DoughnutChart, LineChart } from '../../components/specific/Chart';
import { useAdminGetStatsDataMutation } from '../../redux/api/api';
import { IoPersonSharp } from "react-icons/io5";
import { MdGroups } from "react-icons/md";

const Dashboard = () => {

    const [stats,setStats] = useState(null);

    const [getStats] = useAdminGetStatsDataMutation();

    const [isClient,setIsClient] = useState(false);

    useEffect(()=>{
        setIsClient(true);
        const getData= async ()=>{
          try {
            const res = await getStats().unwrap();
            if(res?.success){
              setStats(res.stats);
            }
          } catch (error) {
            toast.error(error)
          }
        }
        getData();
      },[getStats]);


    const Appbar = (
            <div className="p-4 flex justify-between items-center shadow-xl m-4 rounded-md bg-white">
                <div className="flex items-center w-full">
                        <MdAdminPanelSettings size={40}/>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-black w-full"
                        />
                        <button
                            className="p-2 bg-black text-white rounded-md hover:bg-gray-800"
                        >
                            Search
                        </button>
                </div>
            </div>
        );

    const StatCard = ({ value, label }) => (
        <div className="text-center w-24 p-2 rounded-md bg-white h-24 shadow-xl">
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );   
  return (
    <AdminLayout>
        <div className='flex flex-col'>
            <div>{Appbar}</div>
            <div className="p-4 flex flex-col gap-6 mt-0">
                {/* Chart Area */}
                <div className="flex flex-col lg:flex-row gap-6 shadow-xl p-2 rounded-md bg-gray-100 w-full md:h-200 lg:h-110">
                    <div className="flex-1 min-w-[300px] h-[420px] shadow-xl p-2 rounded-md bg-white">
                            <h3 className="text-lg font-semibold mb-2">Last 7 Days Messages</h3>
                            {isClient &&
                                <div className='h-[360px] mt-12'>
                                    <LineChart valueArray={stats?.messagesChart || [45, 26, 49, 0, 0, 0, 0]} />
                                </div>
                            }
                    </div>
                    <div className="flex-1 min-w-[300px] h-[420px] shadow-xl p-2 rounded-md bg-white">
                            <h3 className="text-lg font-semibold mb-2">Persons vs Groups</h3>
                            <div className="h-[330px] flex items-center justify-center">
                                {isClient &&
                                    <DoughnutChart valueArray={[stats?.totalChatsCount - stats?.groupsCount,stats?.groupsCount] ||[10, 20] } labels={['Single Chats', 'Group Chats']} 
                                />}
                                <div className='absolute justify-center items-center flex gap-2'>
                                    <IoPersonSharp size={20}/> <div>VS</div> <MdGroups size={30}/>
                                </div>
                            </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-6 justify-center md:justify-between items-center mt-2">
                    <StatCard value={stats?.usersCount} label="Users" />
                    <StatCard value={stats?.totalChatsCount} label="Chats" />
                    <StatCard value={stats?.messagesCount} label="Messages" />
                </div>
            </div>
        </div>
    </AdminLayout>
  )
}

export default Dashboard