import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditorComponent = () => {
    // const editorRef = useRef(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         const form = { contant: editorRef.current.getContent() };
    //         addToDatabase(form, "news");
    //     }
    // };

    return (
        <>
            <CKEditor
                editor={ClassicEditor}
                data='<p>Hello from CKEditor 5!</p>'
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                }}
            />
        </>
        // <div className='block-editor'>
        //     <Editor
        //         apiKey='35l6yg65rjt7ynwitk4g3bbozq1zv9xcyfj00iilb33w2qc2'
        //         onInit={(evt, editor) => (editorRef.current = editor)}
        //         initialValue='<p>This is the initial content of the editor.</p>'
        //         init={{
        //             height: 500,
        //             menubar: true,
        //             plugins: [
        //                 "advlist",
        //                 "autolink",
        //                 "lists",
        //                 "link",
        //                 "image",
        //                 "charmap",
        //                 "preview",
        //                 "anchor",
        //                 "searchreplace",
        //                 "visualblocks",
        //                 "code",
        //                 "fullscreen",
        //                 "insertdatetime",
        //                 "media",
        //                 "table",
        //                 "code",
        //                 "help",
        //                 "wordcount",
        //             ],
        //             toolbar:
        //                 "undo redo | blocks | " +
        //                 "bold italic forecolor | alignleft aligncenter " +
        //                 "alignright alignjustify | bullist numlist outdent indent | " +
        //                 "removeformat | help",
        //             content_style:
        //                 "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        //             language: "ru",
        //         }}
        //     />
        //     <button onClick={log}>Log editor content</button>
        // </div>
    );
};
export default EditorComponent;
