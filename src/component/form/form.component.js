import React from "react";
import mime from "mime-types";
import firebase from "../../firebase.utils";
import uuidv4 from "uuid-v4";
import "./form.styles.css";
import Loading from "../loading/loading.component";
import CloseIcon from "../../img/svg/ic_close.svg";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
    this.selectRef = React.createRef();
    this.state = {
      res: [],
      length: 0,
      imageURL: [],
      status: "new",
      isLoading: true,
      files: [],
      isOverSize: false,
      error: false,
    };
  }
  addFile = (event) => {
    console.log(this.props);
    const files = Array.from(event.target.files);
    if (files) {
      this.setState(
        {
          files: this.state.files.concat(files),
          length: files.length,
        },
        () => {
          console.log("asdasdasd");
        }
      );
    }
  };
  test = () => {
    console.log("asdasdas zx asda asd");
  };
  uploadFile = async () => {
    const { files } = this.state;
    var url = "";
    const requestUpload = files.map((file) => {
      const metadata = { contentType: mime.lookup(file.name) };
      const filePath = `${uuidv4()}.jpg`;
      const uploadTask = firebase
        .storage()
        .ref()
        .child(filePath)
        .put(file, metadata);
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snap) => {
            const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
            console.log(progress);
          },
          (err) => {
            console.error(err);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    });
    Promise.all(requestUpload).then((res) => {
      this.sendMessage(res);
    });
  };
  sendMessage = (urlArr = "") => {
    const content = this.contentRef.current.value;
    const type = this.selectRef.current.value;
    firebase
      .database()
      .ref("messages")
      .child("coffessions")
      .push()
      .set({
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          id: "xxx",
          name: "default",
        },
        status: this.state.status,
        name: type,
        content: content,
        fileURL: urlArr,
      })
      .then(() => {
        this.props.handleClick();
        this.props.setLoading(false);
      })
      .catch((err) => {
        this.props.setLoading(false);
        console.error(err);
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const content = this.contentRef.current.value;
    if (content) {
      this.props.setLoading(true);
      this.state.files.length === 0 ? this.sendMessage() : this.uploadFile();
    } else {
      this.setState({ error: true });
    }
  };
  render() {
    const { handleClick } = this.props;
    console.log(this.props);
    const { files, isLoading, error } = this.state;
    return (
      <React.Fragment>
        <div className="form-wrapper">
          <form className="form" onChange={this.handleChange}>
            <div className="close" onClick={handleClick}>
              <img src={CloseIcon} alt="close icon" />
            </div>
            <select
              className="category"
              type="text"
              name="name"
              ref={this.selectRef}
              placeholder="Tên bạn là gì ?"
              required
            >
              <option value="Tâm sự">Tâm sự</option>
              <option value="Crush">Crush</option>
              <option value="Học tập">Học tập</option>
              <option value="Trọ">Trọ</option>
            </select>
            <textarea
              type="text"
              className={`content ${error && "error"}`}
              name="content"
              placeholder="Viết gì đó..."
              ref={this.contentRef}
              rows="20"
              required
            />
            {error && (
              <div style={{ fontSize: "1.6rem" }}>
                Trường nội dung không thể trống
              </div>
            )}
            <div
              className={`preview`}
              style={{ height: `${files.length > 0 ? "15rem" : ""}` }}
            >
              {files &&
                files.map((file) => {
                  return (
                    <img
                      key={files.indexOf(file)}
                      src={URL.createObjectURL(file)}
                      alt="can not preview"
                    />
                  );
                })}
              <label className="file" htmlFor="files">
                <input
                  type="file"
                  id="files"
                  name="image"
                  onChange={this.addFile}
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                />
                +
              </label>
            </div>
            <div
              className="btn btn-send-post"
              style={{ width: "fit-content", margin: "0 auto" }}
              onClick={this.handleSubmit}
            >
              Gửi bài viết
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
export default Form;
