const Create = () => {
    return ( 
        <div>
            <h2>建立新貼文</h2>
            <p>標題</p>
            <input
                type="text"
                required
            ></input>
            <p>內容</p>
            <input
                type="text"
                required
            ></input>
            <p>標籤</p>
            <input
                type="text"
                required
            ></input>
            <button>建立</button>
        </div>
    );
}
 
export default Create;