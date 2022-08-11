import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBCardTitle, MDBCardFooter } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';


function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

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

    <div className="gradient-custom-2" style={{ backgroundColor: '' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#3E5D3E', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <MDBCardImage src={user?.image}
                    alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', Index: '1' }} />
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{user?.username}</MDBTypography>
                  <MDBCardText>{user?.address}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">
                  {user?.role === "cook"
                    ? <div>
                      <MDBCardText className="mb-1 h5">{user?.comments?.length}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0">Reviews</MDBCardText>
                    </div>
                    : <p></p>
                  }
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{user?.favorites?.length}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Favorites</MDBCardText>
                  </div>
                </div>
              </div>
              <div display="flex">
                <NavLink to={`/edit-profile/${userId}`}>
                  <Button style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px', border: 'none' }}>Edit profile</Button>
                </NavLink>
              </div>
              {user?.comments?.length > 0
                ? <MDBCardBody className="text-black p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">Reviews</MDBCardText>
                  </div>
                  <MDBRow>
                    <MDBCol className="mb-2">
                      {user?.comments?.map((comment) => {
                        return (
                          <MDBCard style={{ margin: '1em' }}>
                            <MDBCardBody>
                              <MDBCardTitle>{comment.title}</MDBCardTitle>
                              <MDBCardText>{comment.description}</MDBCardText>
                              <NavLink to={`/cooks/${comment.author._id}`}>
                                <Button style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px', border: 'none' }}>View profile</Button>
                              </NavLink>
                            </MDBCardBody>
                            <MDBCardFooter className='text-muted'>Author: {comment.author.username}</MDBCardFooter>
                          </MDBCard>
                        )
                      })}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                : <p></p>
              }
              {user?.favorites?.length > 0
                ? <MDBCardBody className="text-black p-4">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <MDBCardText className="lead fw-normal mb-0">Favorites</MDBCardText>
                  </div>
                  <MDBRow>
                    <MDBCol className="mb-2">
                      {user?.favorites?.map((favorite) => {
                        return (
                          <MDBCard style={{ margin: '1em' }}>
                            <MDBCardBody>
                              <MDBCardTitle>{favorite.username}</MDBCardTitle>
                              <MDBCardText>{favorite.address}</MDBCardText>
                              <NavLink to={`/cooks/${favorite._id}`}>
                                <Button style={{ backgroundColor: '#3E5D3E', color: '#fff', borderRadius: '15px', padding: '5px 20px', border: 'none' }}>View profile</Button>
                              </NavLink>
                            </MDBCardBody>
                          </MDBCard>
                        )
                      })}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
                : <p>No favorites yet</p>
              }
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProfilePage;