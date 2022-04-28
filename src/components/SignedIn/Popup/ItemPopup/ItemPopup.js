import { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { useSignedIn } from "../../../../contexts/SignedInContext";
import { useProject } from "../../../../contexts/ProjectContext";
import { updateCard } from "../../../../helpers/updateData";
import Edit from "../../Board/Edit";
import MotionDiv from "../../../../helpers/animated-motion-div";
import {
  priorityTagColorDisplay,
  priorityTagTextDisplay,
} from "../../../../helpers/item-display";
import NameDisplay from "../../NameDisplay";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { BsTextLeft, BsChatSquareDotsFill } from "react-icons/bs";
import { BiCommentDetail } from "react-icons/bi";
import "./ItemPopup.scss";

const ItemPopup = ({
  itemPopup,
  toggleItemPopup,
  columnId,
  _id,
  content,
  comments,
  children,
}) => {
  const { user } = useAuth();
  const { projects, setProjects } = useSignedIn();
  const projectIndex = useProject();
  const [lastContent, setLastContent] = useState(content);
  const [newComment, setNewComment] = useState("");
  const [descSaving, setDescSaving] = useState(false);
  const [error, setError] = useState("");

  const postCommentValidation = () => {
    if (newComment !== "") {
      updateCard(
        projects,
        setProjects,
        columnId,
        _id,
        "comment",
        newComment,
        projectIndex,
        user.uid
      );
      return setNewComment("");
    }
    setError("Comment cannot be empty.");
    return setTimeout(() => setError(""), 3000);
  };

  const commentDisplay = comments.map((c) => (
    <Stack key={c._id} className={`${c._id} my-1`}>
      <NameDisplay uid={c.commentor} />
      <div className="border-0 bg-light rounded shadow-sm my-1">
        <p className="comment mx-2 my-1">{c.comment}</p>
      </div>
      <hr className="mt-2 mb-1 text-muted" />
    </Stack>
  ));

  const submitNewDescription = (value) => {
    if (value !== lastContent.description) {
      setDescSaving(true);
      try {
        updateCard(
          projects,
          setProjects,
          columnId,
          _id,
          "description",
          value,
          projectIndex
        );
        setLastContent((prevLastContent) => ({
          prevLastContent,
          description: value,
        }));
        setDescSaving(false);
      } catch (error) {
        setDescSaving(false);
        console.error("Failed to save description: ", error);
      }
    }
  };

  return (
    <MotionDiv>
      <Modal
        show={itemPopup}
        onHide={toggleItemPopup}
        dialogClassName="modal-90w"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="mr-auto">
            <Edit
              thing="card-title"
              display={content.title}
              h="h4"
              submitFunction={(value) =>
                updateCard(
                  projects,
                  setProjects,
                  columnId,
                  _id,
                  "title",
                  value,
                  projectIndex
                )
              }
            />
            <p
              className={`${priorityTagColorDisplay(
                content.priority
              )} priority-tag my-1 text-white px-2 rounded`}
            >
              <small>{priorityTagTextDisplay(content.priority)}</small>
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className="cardDetails-Actions">
              <Col xs={12} md={9} className="main-content">
                <Form className="mr-auto">
                  <Form.Group
                    className="description mb-3"
                    controlId="newContentFormDescription"
                  >
                    <Stack
                      direction="horizontal"
                      className="justify-content-between align-items-end"
                    >
                      <Stack
                        className="description-label mb-1"
                        direction="horizontal"
                      >
                        <BsTextLeft size="1.2rem" className="icon" />
                        <h2 className="h5 mx-2 my-1">Description</h2>
                      </Stack>
                      <h3 className="h6 text-black-50">
                        {descSaving ? "Saving" : "Saved"}
                      </h3>
                    </Stack>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      className="description-input border-0 bg-light rounded shadow-sm"
                      placeholder="Write a description for this task..."
                      defaultValue={content.description}
                      disabled={descSaving}
                      onBlur={(e) => submitNewDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="activity mt-3"
                    controlId="newContentFormActivity"
                  >
                    <Stack className="activity-label" direction="horizontal">
                      <BiCommentDetail size="1.2rem" className="icon" />
                      <h2 className="h5 mx-2 my-1">Activity</h2>
                    </Stack>
                    {error && (
                      <MotionDiv>
                        <Alert variant="danger" className="px-2 py-1">
                          {error}
                        </Alert>
                      </MotionDiv>
                    )}
                    <div className="comment-box">
                      <Stack direction="horizontal" className="my-1">
                        <NameDisplay uid={user.uid} classes="mr-auto" />
                        <Button
                          className="post-comment-btn px-3 py-1 shadow-sm"
                          onClick={postCommentValidation}
                        >
                          Post
                        </Button>
                      </Stack>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        className="comment-input border-0 bg-light rounded shadow-sm"
                        placeholder="Write a new comment..."
                        value={newComment}
                        maxLength={150}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                    </div>
                    <Stack className="other-comments mt-2">
                      {comments.length > 0 ? (
                        commentDisplay
                      ) : (
                        <div className="no-comment text-center my-2 p-2">
                          <BsChatSquareDotsFill size="2rem" />
                          <p className="m-0">No Comments</p>
                          <p className="m-0">Be the first to add one!</p>
                        </div>
                      )}
                    </Stack>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={12} md={3} className="actions">
                {children}
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </MotionDiv>
  );
};

export default ItemPopup;
