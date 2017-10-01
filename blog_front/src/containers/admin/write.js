import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter} from 'react-router-dom';
import * as httpRequest from 'redux/helper/httpRequest'
import dateFormat from 'dateformat';
//config
import urlConfig from 'config/urlConfig'
//redux
import * as adminAction from 'redux/admin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//components
import MarkdownEdit from 'components/admin/markdown';
import ImageView from 'components/admin/imageView';

import 'styles/admin/index.scss'
class Write extends Component { 
    componentDidMount(){

    }
    handleTitle=(e)=>{
        
        const {input}=this.props;
        const title= e.target.value;
        return input.titleWrite({
            title:title,
        })
    }
    handleSummary=(e)=>{
        
        const {input}=this.props;
        const summary= e.target.value;
        return input.summaryWrite({
            summary:summary,
        })
    }
    handleIframeUrl=(e)=>{
        const {input}=this.props;
        const iframeUrl= e.target.value;
        return input.iframeUrlWrite({
            iframeUrl:iframeUrl,
        })
    }
    handleCategory=(e)=>{
        const {input}=this.props;
        const category= e.target.value;
        return input.postCategory({
            category:category,
        })
    }
    handleTag=(e)=>{
        const {input}=this.props;
        let tags=e.target.value;
        if(e.keyCode === 13){
            input.postTags({
                tags:tags
            });
            e.target.value='';
            return false;
            
        }
    }
    handleTagDelete=(i)=>{
        const {input}=this.props;
        return input.deleteTag({
            index:i
        });
            
    }
    handleChange=(e)=>{
        const {input} = this.props;
        let contents = {};
        contents= e.target.value;
        return input.postWrite({
            body:contents,
        })
    }
    handleThumbUpload=(e)=>{
        const {writeupload,thumb}=this.props;
        if(thumb.data.filename){
            writeupload.deleteThumb({
                filename:thumb.data.filename,
                type:'ADMIN/THUMB_DELETE'
            })
        }
        const file=e.target.files[0];
        writeupload.postThumb({
            file,
            name:'file',
            type:'ADMIN/THUMB_UPLOAD'
        })
    }
    handleFileUpload=(e)=>{
        const {writeupload}=this.props;
        const files=e.target.files;
        
        writeupload.postFiles({
            files,
            name:'files',
            type:'ADMIN/FILE_UPLOAD'
        })
    }
    imageDelete=(i,filename)=>{
        const {writeupload}=this.props;
        writeupload.deleteFiles({
            index:i,
            filename:filename,
            type:'ADMIN/FILE_DELETE'
        })
    }
    bytesToSize=(bytes)=>{
        let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     };
    handleSubmit=(e)=>{      
        const {writeupload,writePost}=this.props;
        var now = new Date();
        writeupload.savePost({
            data:{
                ...writePost,
                postDate:dateFormat(now,"mmm d, yyyy")
            },
            type:'ADMIN/POST'
        })
    }
    render() {
        const {writePost,thumb,files}=this.props;
        return (
            <div className="admin-wrapper">
                <div className="header">
                    <div className="post-title">
                        <input className="write-input" type="text" onChange={this.handleTitle} value={writePost.title} placeholder="제목을 입력해주세요"/>
                    </div>
                    <div className="iframe-url">
                        <input className="write-input" type="text" onChange={this.handleIframeUrl} value={writePost.iframeUrl} placeholder="iframe주소를 입력해주세요"/>
                    </div>
                    <div className="post-category">
                        <select onChange={this.handleCategory}>
                            <option>전체</option>
                            <option>motionlab</option>
                            <option>release</option>
                            <option>review</option>
                        </select>
                    </div>
                    <button className="btn-save" onClick={this.handleSubmit}>저장</button>
                </div>
                <div className="summary">
                    <textarea type="text" rows="3" cols="50" onChange={this.handleSummary} value={writePost.summary} placeholder="summary를 입력해주세요"/>
                </div>
                <div className="post-tags">
                    <input className="write-input" type="text" onKeyDown={this.handleTag} placeholder="태그를 입력해주세요"/>
                    <ul>
                        {
                            writePost.tags.map((tag,i)=>{
                                return  <li key={i}>
                                            <span>{tag}</span>
                                            <span className="btn-delete" onClick={this.handleTagDelete.bind(null,i)}>x</span>
                                        </li>
                            })
                        }
                    </ul>
                </div>

                <div className="upload-wrap">
                    <input type="file" id="thumbname" onChange={this.handleThumbUpload} />
                    <label className="btn-upload" htmlFor="thumbname"><span>썸네일 업로드</span></label>
                    <div className="thumb-preview">
                        {
                            thumb.pending?<p>로딩중</p>:
                                thumb.data.path?<img src={`${urlConfig.url}/api/${thumb.data.path}`} alt={thumb.data.path}/>:''
                        }
                    </div>
                </div> 
                <div className="upload-wrap post-images">
                    <input type="file" id="filesname" onChange={this.handleFileUpload} multiple />
                    <label className="btn-upload" htmlFor="filesname"><span>이미지 업로드</span></label>
                    <div className="file-preview">
                        <ul>
                            {
                                files.pending?<p>로딩중</p>:
                                files.data.map((list,i)=>{
                                    return <ImageView key={i} 
                                            size={this.bytesToSize(list.size)} 
                                            link={`${urlConfig.url}/api/${list.path}`}
                                            onClick={this.imageDelete.bind(null,i,list.filename)}
                                            />
                                })
                            }
                        </ul>    
                    </div>    
                </div>
                <MarkdownEdit source={writePost.body} handleChange={this.handleChange}/>
            </div>
        );
    }
}

Write.propTypes = {

};

export default withRouter(connect(
    (state)=>({
        writePost:state.admin.getIn(['createData','data']).toJS(),
        thumb:state.admin.getIn(['createData','data','thumbnail']).toJS(),
        files:state.admin.getIn(['createData','data','files']).toJS(),

    }),
    (dispatch)=>({
        writeupload:bindActionCreators(httpRequest,dispatch),
        input: bindActionCreators(adminAction, dispatch),
    })
)(Write));