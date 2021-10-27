import { NextPage, } from 'next'
import  Image  from 'next/image'
import React from 'react'
import { Comment, Tooltip, Avatar } from 'antd';

interface Props {
    userName: string;
    body: string;
    time: string;
    attachment?: string;
    /*     id: number;
        userId: string */
}


const CommentChat: NextPage<Props> = ({ userName, body, time, attachment }) => {

    return (
        <Comment
            author={userName}
            avatar={< Avatar src={attachment} alt={userName} />}
            content={
                <div>
                    < p >
                        {body}
                    </p >

                    {attachment ? <img src={attachment} alt='attachment' /> : ''}

                </div>

            }
            datetime={
                < span >
                    {time}
                </span >
            }
        />
    );


}

export default CommentChat
