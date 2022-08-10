import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBCardTitle, MDBCardFooter, } from 'mdb-react-ui-kit';


function ProfilePage() {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const [imageSelected, setImageSelected] = useState("");
    const storedToken = localStorage.getItem("authToken");
    let imageUrl;

    const getUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/users/${userId}`)
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getUser();
    }, []);


    return (

<div className="gradient-custom-2" style={{ backgroundColor: '#C7F9CC' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#38A3A5', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={user?.image}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{user?.username}</MDBTypography>
                  <MDBCardText>{user?.address}</MDBCardText>
                  <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible'}}>
                    Edit profile
                  </MDBBtn>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <MDBCardText className="mb-1 h5">{user?.comments?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Reviews</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{user?.favorites?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Favourites</MDBCardText>
                  </div>
                </div>
              </div>
              <MDBBtn outline color="dark" style={{height: '36px', overflow: 'visible', width: '10em', align:'center'}}>
                    Edit profile
                  </MDBBtn>
              { user?.comments?.length > 0
              ? <MDBCardBody className="text-black p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <MDBCardText className="lead fw-normal mb-0">Reviews</MDBCardText>
              </div>
              <MDBRow>
                <MDBCol className="mb-2">
                    {user?.comments?.map((comment) => {
                        return(
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{comment.title}</MDBCardTitle>
                                    <MDBCardText>{comment.description}</MDBCardText>
                                    <MDBBtn href={`/cooks/${comment.author._id}`}>View profile</MDBBtn>
                                </MDBCardBody>
                                <MDBCardFooter className='text-muted'>{comment.author.username}</MDBCardFooter>
                            </MDBCard>
                        )
                    })}
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            :<p>No reviews yet</p>
              }
              { user?.favorites?.length > 0
              ? <MDBCardBody className="text-black p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <MDBCardText className="lead fw-normal mb-0">Favourites</MDBCardText>
              </div>
              <MDBRow>
                <MDBCol className="mb-2">
                    {user?.favorites?.map((favorite) => {
                        return(
                            <MDBCard>
                                <MDBCardBody>
                                    <MDBCardTitle>{favorite.username}</MDBCardTitle>
                                    <MDBCardText>{favorite.address}</MDBCardText>
                                    <MDBBtn href={`/cooks/${favorite._id}`}>View profile</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        )
                    })}
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
            :<p>No favourites yet</p>
              }
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>


        // <div className="UserDetails">

        //     {user && (
        //         <>
        //             <h1>{user.username}</h1>
        //             <img src={user.image}/>
        //             <p>{user.address}</p>
        //             <p>{user.role}</p>
        //             <NavLink to={`/edit-profile/${userId}`}>
        //                 <button>Edit profile</button>
        //             </NavLink>
        //         </>
        //     )}

        //     <h1>Favorites</h1>        
        //     { user?.favorites 
        //     ? user?.favorites.map((favorite) => (
        //             <div id={favorite._id}>
        //                 <h3>{favorite.username}</h3>
        //                 <h4>Address:</h4>
        //                 <p>{favorite.address}</p>
        //             </div>
        //             ))
        //     :<p>You don't have any favorite cooks yet</p>
        //     }        

        //     <h1>Reviews</h1>
        //     { user?.comments 
        //     ? user?.comments.map((comment) => (
        //             <div id={comment._id}>
        //                 <h3>{comment.title}</h3>
        //                 <p>{comment.description}</p>
        //                 <p>{comment.author.username}</p>
        //             </div>
        //             ))
        //     :<p>You don't have any reviews yet</p>
        //     } 
        //     <NavLink to="/">
        //         <button>Back to home</button>
        //     </NavLink>
        // </div>
    );
}

export default ProfilePage;