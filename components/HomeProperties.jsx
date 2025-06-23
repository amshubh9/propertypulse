import React from 'react';
import PropertyCard from '@/components/PropertyCard';
import { fetchProperties } from '@/utils/requests';

const HomeProperties = async () => {
  const data = await fetchProperties();

  // Ensure properties is an array; default to empty array if not
  const propsArray = Array.isArray(data?.properties) ? data.properties : [];

  // Copy before sort to avoid mutating original
  const recentProperties = [...propsArray]
    // random shuffle; sort comparator with random gives a quick but not perfectly uniform shuffle
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Recent Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProperties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            recentProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeProperties;

