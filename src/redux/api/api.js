import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { server } from '../../constant/config';

const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/`}),
    tagTypes:["Chat","User","Message",'Admin'],

    endpoints:(builder)=>({
       getProfile:builder.mutation({
            query:()=>({
                url:'user/get-profile',
                method:"Get",
                credentials:'include'
            }),
            providesTags:["User"]

       }), 
       myChats:builder.query({
        query:()=>({
            url:"chat/getmychats",
            credentials:"include"
        }),
        providesTags:["Chat"]
       }),

       searchUser:builder.query({
            query:(name)=>({
               url:`user/search?name=${name}`,
               credentials:"include",
            }),
            providesTags:["User"]
       }),

       sendFriendRequest:builder.mutation({
            query:(data)=>({
                url:"user/sendrequest",
                method:"PUT",
                credentials:'include',
                body:data,
            }),
            invalidatesTags:["User"]
       }),

       getNotification:builder.query({
            query:()=>({
               url:`user/notifications`,
               credentials:"include",
            }),
            keepUnusedDataFor:0,
       }),

       handleFriendRequest:builder.mutation({
            query:({ requestId, handle})=>({
                url:"user/handlerequest",
                method:"PUT",
                credentials:"include",
                body:{requestId,handle},
            }),
            invalidatesTags:["Chat"]
       }),

       chatDetails:builder.query({
            query:({chatId,populate=false})=>{
                let url=`chat/${chatId}`;
                if(populate) url+="?populate=true";
                
                return {
                    url,
                    credentials:"include",
                }
            },
            providesTags:["Chat"],
       }),

       getMessages:builder.query({
            query:({chatId,page})=>({
                url:`chat/message/${chatId}?page=${page}`,
                credentials:'include'
            }),
            keepUnusedDataFor:0,
       }),

        sendAttachments:builder.mutation({
            query:({data})=>({
                url:"chat/message",
                method:"POST",
                credentials:"include",
                body:data,
            }),
       }),

       availableFriends : builder.query({
            query:(chatId)=>{
                let url=`user/friends`;
                if (chatId) url+=`?chatId={chatId}`
                return {
                    url,
                    credentials:"include"
                }
            },
            providesTags:["User"],
       }),

       newGroup:builder.mutation({
            query:({name,members})=>({
                url:"chat/newgroup",
                method:"POST",
                credentials:"include",
                body:{name,members},
            }),
            invalidatesTags:["Chat"]
       }),

       renameGroup: builder.mutation({
            query:({chatId,name})=>({
                url:`chat/${chatId}`,
                method:"PUT",
                credentials:"include",
                body:{name}
            }),
            invalidatesTags:['Chat']
       }),

       removeGroupMember: builder.mutation({
            query:({chatId,userId})=>({
                url:`chat/removemembers`,
                method:"PUT",
                credentials:"include",
                body:{chatId,userId}
            }),
            invalidatesTags:['Chat']
       }),



       addGroupMember: builder.mutation({
            query:({chatId,members})=>({
                url:`chat/addmembers`,
                method:"PUT",
                credentials:"include",
                body:{chatId,members}
            }),
            invalidatesTags:['Chat']
       }),

        deleteGroupChat: builder.mutation({
            query:(chatId)=>({
                url:`chat/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:['Chat']
       }),

       leaveGroupChat: builder.mutation({
            query:(chatId)=>({
                url:`chat/leave/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:['Chat']
       }),


       adminLogin: builder.mutation({
            query:({username,password})=>({
                url:'admin/verify',
                method:"POST",
                credentials:"include",
                body:{username,password}
            }),
            invalidatesTags:["Admin"]
       }),

       getAdmin: builder.mutation({
            query:()=>({
                url:'admin/',
                method:"GET",
                credentials:"include"
            }),
            invalidatesTags:["Admin"]
       }),

       adminLogout: builder.mutation({
            query:()=>({
                url:'admin/logout',
                method:"GET",
                credentials:"include"
            }),
            invalidatesTags:["Admin"]
       }),

       adminGetAllUsers:builder.mutation({
            query:()=>({
                url:'admin/users',
                method:"GET",
                credentials:"include"
            }),
            invalidatesTags:["Admin"]
       }),

       adminGetStatsData:builder.mutation({
            query:()=>({
                url:'admin/stats',
                method:"GET",
                credentials:"include"
            }),
            invalidatesTags:["Admin"]
       }),

    })
});


export default api;

export const {
    useGetProfileMutation,
    useMyChatsQuery,
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationQuery,
    useHandleFriendRequestMutation,
    useChatDetailsQuery,
    useGetMessagesQuery,
    useSendAttachmentsMutation,
    useAvailableFriendsQuery,
    useNewGroupMutation,
    useRenameGroupMutation,
    useRemoveGroupMemberMutation,
    useAddGroupMemberMutation,
    useDeleteGroupChatMutation,
    useLeaveGroupChatMutation,
    useAdminLoginMutation,
    useGetAdminMutation,
    useAdminLogoutMutation,
    useAdminGetAllUsersMutation,
    useAdminGetStatsDataMutation,
} = api;