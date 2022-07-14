import React from "react";
import { createReactEditorJS } from "react-editor-js";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";

import "../style/react-editor-style.sass";

const EditorComponent = () => {
    const ReactEditorJS = createReactEditorJS();
    let data = { 1: "test" };

    return (
        <div className='block-editor'>
            <ReactEditorJS
                defaultValue={data}
                tools={{
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: "http://localhost:5000/fetchUrl", // Your backend endpoint for url data fetching
                        },
                    },
                    ImageTool: {
                        class: ImageTool,
                        config: {
                            byFile: "http://localhost:5000/api/imageupload/uploadFile",
                            byUrl: "http://localhost:5000/api/imageupload/fetchUrl",
                        },
                    },
                }}
            />
        </div>
    );
};
export default EditorComponent;
