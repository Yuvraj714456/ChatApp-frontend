import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { server } from '../../constant/config';

const api = createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
                baseUrl:`${server}/api/v1/`,
                credentials:'include'}),
    tagTypes:["Chat","User","Message",'Admin'],

    endpoints:(builder)=>({
       getProfile:builder.mutation({
            query:()=>({
                url:'user/get-profile',
                method:"Get"
            }),
            providesTags:["User"]

       }), 
       myChats:builder.query({
        query:()=>({
            url:"chat/getmychats"   
        }),
        providesTags:["Chat"]
       }),

       searchUser:builder.query({
            query:(name)=>({
               url:`user/search?name=${name}`

            }),
            providesTags:["User"]
       }),

       sendFriendRequest:builder.mutation({
            query:(data)=>({
                url:"user/sendrequest",
                method:"PUT",
                body:data,
            }),
            invalidatesTags:["User"]
       }),

       getNotification:builder.query({
            query:()=>({
               url:`user/notifications`,

            }),
            keepUnusedDataFor:0,
       }),

       handleFriendRequest:builder.mutation({
            query:({ requestId, handle})=>({
                url:"user/handlerequest",
                method:"PUT",

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
    
                }
            },
            providesTags:["Chat"],
       }),

       getMessages:builder.query({
            query:({chatId,page})=>({
                url:`chat/message/${chatId}?page=${page}`
            }),
            keepUnusedDataFor:0,
       }),

        sendAttachments:builder.mutation({
            query:({data})=>({
                url:"chat/message",
                method:"POST",

                body:data,
            }),
       }),

       availableFriends : builder.query({
            query:(chatId)=>{
                let url=`user/friends`;
                if (chatId) url+=`?chatId={chatId}`
                return {
                    url,
                    }
            },
            providesTags:["User"],
       }),

       newGroup:builder.mutation({
            query:({name,members})=>({
                url:"chat/newgroup",
                method:"POST",

                body:{name,members},
            }),
            invalidatesTags:["Chat"]
       }),

       renameGroup: builder.mutation({
            query:({chatId,name})=>({
                url:`chat/${chatId}`,
                method:"PUT",

                body:{name}
            }),
            invalidatesTags:['Chat']
       }),

       removeGroupMember: builder.mutation({
            query:({chatId,userId})=>({
                url:`chat/removemembers`,
                method:"PUT",

                body:{chatId,userId}
            }),
            invalidatesTags:['Chat']
       }),



       addGroupMember: builder.mutation({
            query:({chatId,members})=>({
                url:`chat/addmembers`,
                method:"PUT",

                body:{chatId,members}
            }),
            invalidatesTags:['Chat']
       }),

        deleteGroupChat: builder.mutation({
            query:(chatId)=>({
                url:`chat/${chatId}`,
                method:"DELETE",

            }),
            invalidatesTags:['Chat']
       }),

       leaveGroupChat: builder.mutation({
            query:(chatId)=>({
                url:`chat/leave/${chatId}`,
                method:"DELETE",

            }),
            invalidatesTags:['Chat']
       }),


       adminLogin: builder.mutation({
            query:({username,password})=>({
                url:'admin/verify',
                method:"POST",

                body:{username,password}
            }),
            invalidatesTags:["Admin"]
       }),

       getAdmin: builder.mutation({
            query:()=>({
                url:'admin/',
                method:"GET",
            }),
            invalidatesTags:["Admin"]
       }),

       adminLogout: builder.mutation({
            query:()=>({
                url:'admin/logout',
                method:"GET",
            }),
            invalidatesTags:["Admin"]
       }),

       adminGetAllUsers:builder.mutation({
            query:()=>({
                url:'admin/users',
                method:"GET",
            }),
            invalidatesTags:["Admin"]
       }),

       adminGetStatsData:builder.mutation({
            query:()=>({
                url:'admin/stats',
                method:"GET",
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