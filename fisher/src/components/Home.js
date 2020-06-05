import React from 'react';

function Home(){

    return (
        <div className="bg-dark vh-100 d-flex justify-content-center align-items-center flex-column">
            <h1 className="text-center text-danger font-weight-bold pb-3">Fisherman Application</h1>
            <p className="text-center text-danger h3">
                In this application you can share your catches with other fishermans, and you can manage your fishing gear.<br></br>
                You can use our database to get information about the catches all over the country. You can filter the database for more efficient use.
            </p>
        </div>
    )

}

export default Home;
