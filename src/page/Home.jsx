import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import '../components/Home/Home.css';
import Avatar from '../assets/avatar.jpg';
import { CameraFill, PencilSquare } from 'react-bootstrap-icons';
import { PersonCircle } from 'react-bootstrap-icons';
import Post from '../assets/post.jpg';
import { Heart } from 'react-bootstrap-icons';
import { Reply } from 'react-bootstrap-icons';
import { ThreeDots } from 'react-bootstrap-icons';

export default function Home() {
  return (
    <Col className="HomePage" lg="12">
      <Col className="leftContent" lg="3" md="4">
        <Card style={{ width: '80%' }}>
          <Card.Img variant="top" src={Avatar} className="rounded-circle" />
          <Card.Body>
            <Card.Title>Nguyen Van A</Card.Title>
            <Card.Text>
              <h6 style={{ marginTop: '20px' }}>Your Flens Link:</h6>{' '}
              htttps:flens.com/quocthanhh
            </Card.Text>
            <Card.Text>
              <h6>Favourites:</h6> Camera
            </Card.Text>
            <Card.Text>
              <h6>Skills:</h6> portrait photography
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <div className="line"></div>

      <Col className="rightContent" lg="8" md="8">
        <Row className="Upload-bar">
          <Card>
            <Card.Body>
              <Card.Title>Write something about your day!</Card.Title>
              <hr style={{ color: '#F08080', borderWidth: '3px' }}></hr>
              <Row className="upload-Content" lg="12">
                <Col lg="4">
                  <Card.Text>
                    <CameraFill />
                    Upload a photo
                  </Card.Text>
                </Col>
                <Col lg="4">
                  <Card.Text>
                    <PencilSquare />
                    Publish a Story
                  </Card.Text>
                </Col>
                <Col lg="2"></Col>
                <Col lg="1" className="postClass">
                  <button className="post-Button">Post</button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>

        <Row className="List-posts">
          <Card>
            <Card.Body>
              <Row>
                <Col className="post-avatar" lg="1">
                  <PersonCircle />
                </Col>
                <Col lg="9">
                  <Card.Text style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: '600' }}>Nguyen Van A</span>{' '}
                    uploaded a photo
                  </Card.Text>
                  <Card.Text style={{ marginBottom: '10px' }}>
                    1 day ago
                  </Card.Text>
                </Col>
              </Row>

              <Row className="image-post-detail">
                <Card.Img src={Post}></Card.Img>
              </Row>
              <Row>
                <Card.Title>Title</Card.Title>
                <Card.Text>Some information about the picture.</Card.Text>
                <Row className="hashtagPost">
                  <div>#HashTag1</div>
                  <div>#HashTag2</div>
                  <div>#HashTag3</div>
                </Row>
                <Row>
                  <Col className="reactBar">
                    <Col>
                      <div className="d-flex">
                        <Heart />
                        <Card.Text style={{ marginTop: '5px' }}>50</Card.Text>
                      </div>
                    </Col>

                    <Reply />

                    <ThreeDots style={{ marginTop: '6px' }} />
                  </Col>
                </Row>
              </Row>

              <hr style={{ color: '#F08080', borderWidth: '3px' }}></hr>

              <Row>
                <Row className="comment">
                  <Col lg="1">
                    <PersonCircle
                      style={{
                        width: '35px',
                        height: '35px',
                        marginLeft: '10px',
                      }}
                    />
                  </Col>
                  <Col>
                    <Card.Text style={{ marginTop: '10px' }}>
                      Add a comment...
                    </Card.Text>
                  </Col>
                </Row>

                <Row className="anotherComment">
                  <Col>
                    <Row style={{ marginBottom: '10px' }}>
                      <Row>
                        <Col lg="1">
                          <PersonCircle style={{ marginLeft: '20px' }} />
                        </Col>
                        <Col>
                          <Card.Text style={{ marginTop: '5px' }}>
                            <span style={{ fontWeight: '600' }}>Anna Ly</span>
                          </Card.Text>
                        </Col>
                      </Row>

                      <Row style={{ marginLeft: '65px' }}>
                        <Card.Text>Really nice</Card.Text>
                        <Card.Text>
                          <span style={{ fontWeight: '600' }}>Reply</span> 2
                          hours ago
                        </Card.Text>
                      </Row>
                    </Row>

                    <Row style={{ marginBottom: '10px' }}>
                      <Row>
                        <Col lg="1">
                          <PersonCircle style={{ marginLeft: '20px' }} />
                        </Col>
                        <Col>
                          <Card.Text style={{ marginTop: '5px' }}>
                            <span style={{ fontWeight: '600' }}>Anna Ly</span>
                          </Card.Text>
                        </Col>
                      </Row>

                      <Row style={{ marginLeft: '65px' }}>
                        <Card.Text>Really nice</Card.Text>
                        <Card.Text>
                          <span style={{ fontWeight: '600' }}>Reply</span> 2
                          hours ago
                        </Card.Text>
                      </Row>
                    </Row>

                    <Row>
                      <Card.Text>
                        <span style={{ fontWeight: '600' }}>
                          View more 3 comment...
                        </span>
                      </Card.Text>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Row className="">
                <Col className="post-avatar" lg="1">
                  <PersonCircle />
                </Col>
                <Col lg="9">
                  <Card.Text style={{ marginTop: '10px' }}>
                    <span style={{ fontWeight: '600' }}>Nguyen Van A</span>{' '}
                    uploaded a photo
                  </Card.Text>
                  <Card.Text style={{ marginBottom: '10px' }}>
                    1 day ago
                  </Card.Text>
                </Col>
              </Row>

              <Row>
                <Card.Img src={Post}></Card.Img>
              </Row>
              <Row>
                <Card.Title>Title</Card.Title>
                <Card.Text>Some information about the picture.</Card.Text>
                <Row className="hashtagPost">
                  <div>#HashTag1</div>
                  <div>#HashTag2</div>
                  <div>#HashTag3</div>
                </Row>
                <Row>
                  <Col className="reactBar">
                    <Col>
                      <div className="d-flex">
                        <Heart />
                        <Card.Text style={{ marginTop: '5px' }}>50</Card.Text>
                      </div>
                    </Col>

                    <Reply />

                    <ThreeDots style={{ marginTop: '6px' }} />
                  </Col>
                </Row>
              </Row>

              <hr style={{ color: '#F08080', borderWidth: '3px' }}></hr>

              <Row>
                <Row className="comment">
                  <Col lg="1">
                    <PersonCircle
                      style={{
                        width: '35px',
                        height: '35px',
                        marginLeft: '10px',
                      }}
                    />
                  </Col>
                  <Col>
                    <Card.Text style={{ marginTop: '10px' }}>
                      Add a comment...
                    </Card.Text>
                  </Col>
                </Row>

                <Row className="anotherComment">
                  <Col>
                    <Row style={{ marginBottom: '10px' }}>
                      <Row>
                        <Col lg="1">
                          <PersonCircle style={{ marginLeft: '20px' }} />
                        </Col>
                        <Col>
                          <Card.Text style={{ marginTop: '5px' }}>
                            <span style={{ fontWeight: '600' }}>Anna Ly</span>
                          </Card.Text>
                        </Col>
                      </Row>

                      <Row style={{ marginLeft: '65px' }}>
                        <Card.Text>Really nice</Card.Text>
                        <Card.Text>
                          <span style={{ fontWeight: '600' }}>Reply</span> 2
                          hours ago
                        </Card.Text>
                      </Row>
                    </Row>

                    <Row style={{ marginBottom: '10px' }}>
                      <Row>
                        <Col lg="1">
                          <PersonCircle style={{ marginLeft: '20px' }} />
                        </Col>
                        <Col>
                          <Card.Text style={{ marginTop: '5px' }}>
                            <span style={{ fontWeight: '600' }}>Anna Ly</span>
                          </Card.Text>
                        </Col>
                      </Row>

                      <Row style={{ marginLeft: '65px' }}>
                        <Card.Text>Really nice</Card.Text>
                        <Card.Text>
                          <span style={{ fontWeight: '600' }}>Reply</span> 2
                          hours ago
                        </Card.Text>
                      </Row>
                    </Row>

                    <Row>
                      <Card.Text>
                        <span style={{ fontWeight: '600' }}>
                          View more 3 comment...
                        </span>
                      </Card.Text>
                    </Row>
                  </Col>
                </Row>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Col>
    </Col>
  );
}
