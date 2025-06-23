'use client';
import{useState,useEffect} from 'react';
import Spinner from '@/components/Spinner';
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
// import profileDefault from '@assets/images/profile.png';
const ProfilePage = () => {
      const {data: session}=useSession();
      const profileImage=session?.user?.image;
      const profileName=session?.user?.name;
      const profileEmail=session?.user?.email;

      const [properties,setProperties]=useState([]);
      const [loading,setLoading]=useState(true);
      const [deletingId, setDeletingId] = useState(null);
   useEffect(() => {
  // only run if we have a user ID
  if (!session?.user?.id) return;

  const fetchUserProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/properties/user/${session.user.id}`);
      if (!res.ok) {
        console.error('Failed to fetch user properties:', res.status);
        return;
      }
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error('Error fetching user properties:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchUserProperties();
}, [session?.user?.id]);

const handleDeleteProperty = async (propertyId) => {
  const confirmed = window.confirm('Are you sure you want to delete the property?');
  if (!confirmed) return;
  setDeletingId(propertyId);
  try {
    const res = await fetch(`/api/properties/${propertyId}`, { method: 'DELETE' });
    if (res.ok) {
      setProperties(prev => prev.filter(p => p._id !== propertyId));
      toast.success('Property deleted');
    } else {
      toast.error('Failed to delete property');
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to delete property');
  } finally {
    setDeletingId(null);
  }
};

  return (
    //  <!-- Profile Section -->
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
               <Image
                 className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage ||
                    '/images/properties/profile.png'
                  }
                  alt="User"
                  width={192} // or appropriate values
                  height={192}
                   />
              </div>
              <h2 className="text-2xl mb-4"><span className="font-bold block">Name: </span>{profileName}</h2>
              <h2 className="text-2xl"><span className="font-bold block">Email: </span> {profileEmail}</h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                {!loading && properties.length==0  && (
                    <p> You have no property listings</p>
                )}
                {loading ? (<Spinner loading={loading}/>):(
                    properties.map((property)=>(
                        <div key={property._id} className="mb-10">
                <Link href={`/properties/${property._id}`}>
                  <Image
                    className="h-32 w-full rounded-md object-cover"
                    src={property.images[0]}
                    alt=""
                    width={500}
                    height={200}
                    priority={true}
                  />
                </Link>
                <div className="mt-2">
                  <p className="text-lg font-semibold">{property.name}</p>
                  <p className="text-gray-600">Address: {property.location.street}  {property.location.city} </p>
                </div>
                <div className="mt-2">
                  <Link href={`/properties/${property._id}/edit`}
                    className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                   onClick={()=>handleDeleteProperty(property._id)} 
                    className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </div>
                    ))
                )}
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default ProfilePage