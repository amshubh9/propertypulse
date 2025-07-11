import React from 'react';
import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    // {/* Renters and Owners section */}
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            description="Find your dream rental property. Bookmark properties and contact owners."
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: 'Browse Properties',
              link: '/properties',
              backgroundColor: 'bg-black hover:bg-gray-700'
            }}>Find your dream rental property. Bookmark properties and contact
              owners.
                </InfoBox>
          <InfoBox
            heading="For Property Owners"
            description="List your properties and reach potential tenants. Rent as an Airbnb or long term."
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: 'Add Property',
              link: '/properties/add',
              backgroundColor: 'bg-blue-500 hover:bg-blue-600'
            }}>
             List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
