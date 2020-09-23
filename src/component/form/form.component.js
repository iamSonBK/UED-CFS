import React from "react";
import mime from "mime-types";
import firebase from "../../firebase.utils";
import uuidv4 from "uuid-v4";
import "./form.styles.css";
import Loading from "../loading/loading.component";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: [],
      length: 0,
      imageURL: [],
      name: "Tâm sự",
      content: "",
      isLoading: false,
      files: [],
      isOverSize: false,
    };
  }

  addFile = (event) => {
    const files = Array.from(event.target.files);
    if (files) {
      this.setState({
        files: this.state.files.concat(files),
        length: files.length,
      });
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  uploadFile = async () => {
    const { files } = this.state;
    const filePath = `${uuidv4()}.jpg`;
    const urlArr = [];
    this.setState({ isLoading: true });
    files.forEach((file) => {
      const metadata = { contentType: mime.lookup(file.name) };
      firebase
        .storage()
        .ref()
        .child(filePath)
        .put(file, metadata)
        .on(
          "state_changed",
          (snap) => {},
          (err) => {
            console.error(err);
          },
          () => {
            firebase
              .storage()
              .ref()
              .child(filePath)
              .put(file, metadata)
              .snapshot.ref.getDownloadURL()
              .then((downloadURL) => {
                urlArr.push(downloadURL);
              })
              .then(() => {
                if (urlArr.length === files.length) {
                  this.sendFileMessage(urlArr);
                  this.setState({ isLoading: false });
                  this.props.handleClick();
                }
              });
          }
        );
    });
  };
  sendFileMessage = (urlArr) => {
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
        name: this.state.name,
        content: this.state.content,
        fileURL: urlArr,
      })
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  sendMessage = () => {
    this.setState({ isLoading: true });
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
        name: this.state.name,
        content: this.state.content,
        fileURL: "",
      })
      .then(() => {
        this.props.handleClick();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  checkNull = (content) => {
    return content !== "";
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.checkNull(this.state.content)) {
      this.state.files.length === 0 ? this.sendMessage() : this.uploadFile();
    }
  };
  render() {
    const { handleClick } = this.props;
    const { content, name, files, isLoading, isOverSize } = this.state;
    return (
      <React.Fragment>
        {isLoading ? <Loading /> : ""}

        <form className="form" onChange={this.handleChange}>
          <span className="close" onClick={handleClick}>
            &Chi;
          </span>
          <select
            className="category"
            type="text"
            name="name"
            placeholder="Tên bạn là gì ?"
            onChange={this.handleChange}
            value={name}
            required
          >
            <option value="Tâm sự">Tâm sự</option>
            <option value="Crush">Crush</option>
            <option value="Học tập">Học tập</option>
            <option value="Trọ">Trọ</option>
          </select>
          <textarea
            type="text"
            className="content"
            name="content"
            placeholder="Viết gì đó..."
            onChange={this.handleChange}
            value={content}
            rows="20"
            required
          />
          <div className="preview">
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
          <div id="heart" className="button" onClick={this.handleSubmit}>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 383.946 383.946"
            >
              <g>
                <g>
                  <path
                    d="M383.691,12.826c-0.016-0.064-0.04-0.128-0.056-0.192c-0.272-1.272-0.736-2.504-1.32-3.696
			c-0.152-0.304-0.304-0.6-0.472-0.904c-0.688-1.208-1.488-2.368-2.52-3.4s-2.2-1.832-3.408-2.52
			c-0.288-0.168-0.576-0.312-0.88-0.464c-1.224-0.6-2.48-1.088-3.792-1.36c-0.04-0.008-0.064-0.016-0.096-0.024
			c-1.368-0.272-2.76-0.312-4.152-0.224c-0.304,0.016-0.608,0.048-0.912,0.088c-1.408,0.168-2.808,0.464-4.144,1.008l-351.992,144
			c-6.28,2.568-10.256,8.816-9.928,15.584c0.328,6.776,4.888,12.608,11.392,14.552l151.744,45.528l45.52,151.744
			c1.952,6.496,7.784,11.056,14.552,11.384c0.264,0.008,0.52,0.016,0.784,0.016c6.464,0,12.336-3.904,14.808-9.944l144-352
			c0-0.008,0-0.008,0-0.016c0.536-1.312,0.824-2.68,0.992-4.064c0.04-0.344,0.08-0.68,0.096-1.024
			C383.987,15.538,383.955,14.17,383.691,12.826z M63.947,157.618l236.512-96.76L171.451,189.874L63.947,157.618z M226.323,320.01
			l-32.248-107.512l129-129L226.323,320.01z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M139.315,244.634c-6.248-6.248-16.376-6.248-22.624,0l-40,40c-6.248,6.248-6.248,16.376,0,22.624
			c3.128,3.128,7.216,4.688,11.312,4.688s8.184-1.56,11.312-4.688l40-40C145.563,261.01,145.563,250.882,139.315,244.634z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M51.315,244.634c-6.248-6.248-16.376-6.248-22.624,0l-24,24c-6.248,6.248-6.248,16.376,0,22.624
			c3.128,3.128,7.216,4.688,11.312,4.688s8.184-1.56,11.312-4.688l24-24C57.563,261.01,57.563,250.882,51.315,244.634z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    d="M139.315,332.634c-6.248-6.248-16.376-6.248-22.624,0l-24,24c-6.248,6.248-6.248,16.376,0,22.624
			c3.128,3.128,7.216,4.688,11.312,4.688s8.184-1.56,11.312-4.688l24-24C145.563,349.01,145.563,338.882,139.315,332.634z"
                  />
                </g>
              </g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default Form;
