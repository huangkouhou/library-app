import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import AddBookRequest from "../../../models/AddBookRequest";

export const AddNewBook = () => {

    const { isAuthenticated, getAccessTokenSilently} = useAuth0();
    
    // New Book
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [copies, setCopies] = useState(0);
    const [category, setCategory] = useState('Category');
    const [selectedImage, setSelectedImage] = useState<any>(null);

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function categoryField(value: string){
        setCategory(value);
    }

    //files[0] 取第一个文件（一般就是用户选中的第一个图片）
    async function base64ConversionForImages(e: any){
        if (e.target.files[0]){
            getBase64(e.target.files[0]);
        }
    }
//用户通过文件上传控件选择一张图片后，读取这张图片文件，
// 并将其内容转换成 Base64 编码的字符串，然后将这个字符串存入 React 组件的状态 (state) 中。
    function getBase64(file: any){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            setSelectedImage(reader.result);
        };
        reader.onerror = function(error){
            console.log('Error', error);
        }
    }

    async function submitNewBook(){
        const url = `${process.env.REACT_APP_API}/admin/secure/add/book`;
        const accessToken = await getAccessTokenSilently();
        console.log("accessToken:", accessToken);
        if (isAuthenticated && title !== '' && author !== '' && category !== 'Category'
            && description !== '' && copies >= 0){
                const book: AddBookRequest = new AddBookRequest(title, author, description, copies, category);
                book.img = selectedImage;
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                };

                const submitNewBookResponse = await fetch(url, requestOptions);
                if (!submitNewBookResponse.ok){
                    throw new Error('Something went wrong!');
                }
                // 如果后端返回成功（书籍添加成功）当你把它们设为空，React 会重新渲染组件 → 输入框里的值就被清掉。
                //就像你在网页上填完一个“新增书籍”的表单并提交后，页面显示“新增成功！”，同时表单清空，可以立刻继续录入下一本。
                setTitle('');
                setAuthor('');
                setDescription('');
                setCopies(0);
                setCategory('Category');
                setSelectedImage(null);
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            } 
    }

    return(
        <div>
            {displaySuccess &&
                <div className="alert alert-success" role='alert'>
                    Book added successfully
                </div>
            }
            {displayWarning &&
                <div className="alert alert-danger" role='alert'>
                    All fields must be filled out
                </div>
            }
            <div className="card">
                <div className="card-header">
                    Add a new book
                </div>
                <div className="card-body">
                    <form method='POST'>
                        <div className="row">
                            <div className='col-md-6 mb-3'>
                                <label className="form-label">Title</label>
                                <input type="text" className="form-control" name='title' required
                                    onChange={e => setTitle(e.target.value)} value={title}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className="form-label">Author</label>
                                <input type="text" className="form-control" name='author' required
                                    onChange={e => setAuthor(e.target.value)} value={author}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className="form-label">Category</label>
                                <button className="form-control btn btn-secondary dropdown-toggle" type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                    {category}
                                </button>
                                <ul id='AddNewBookId' className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a onClick={() => categoryField('FE')} className="dropdown-item">Front End</a></li>
                                    <li><a onClick={() => categoryField('BE')} className="dropdown-item">Back End</a></li>
                                    <li><a onClick={() => categoryField('Date')} className="dropdown-item">Data</a></li>
                                    <li><a onClick={() => categoryField('DevOps')} className="dropdown-item">DevOps</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id='exampleFormControlTextarea1' rows={3}
                                onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label className="form-label">Copies</label>
                            <input type='number' className="form-control" name='Copies' required
                                onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                        </div>
                        <input type='file' onChange={e => base64ConversionForImages(e)}/>
                        <div>
                            <button type='button' className="btn btn-primary mt-3" onClick={submitNewBook}>
                                Add Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  );
}