import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    memberDetails: {},
    allMembersDetails: [],
}

const postSlice = createSlice ({
    name: "member",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true
        },
        getMemberDetails: (state, action) => {
            state.memberDetails = action.payload.member;
        },
        getAllMembersDetails: (state, action) => {
            // state.allMembersDetails = action.payload.allMembers
            state.allMembersDetails = action.payload.allMembers.filter((member) => member.data.auth.data.role.includes("member"));
            state.allMembersDetails = state.allMembersDetails.sort((name1, name2) => {
                if (name1.data.auth.data.name.toLowerCase() < name2.data.auth.data.name.toLowerCase()) {
                    return -1;
                }
                if (name1.data.auth.data.name.toLowerCase() > name2.data.auth.data.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        },
        addMember: (state, action) => {
            state.allMembersDetails.push(action.payload.newMember);
            state.allMembersDetails = state.allMembersDetails.sort((name1, name2) => {
                if (name1.data.auth.data.name.toLowerCase() < name2.data.auth.data.name.toLowerCase()) {
                    return -1;
                }
                if (name1.data.auth.data.name.toLowerCase() > name2.data.auth.data.name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        },
        delMember: (state, action) => {
            state.allMembersDetails = state.allMembersDetails.filter((member) => member.data.auth._id !== action.payload.phone)
            state.memberDetails.totalSavings.totalSavings = state.memberDetails.totalSavings.totalSavings - action.payload.saving
        },
        logout: (state, action) => {
            state.status = false;
            state.memberDetails = {};
            state.allMembersDetails = [];
        }
    }
})

export const { login, getMemberDetails, getAllMembersDetails, addMember, delMember, logout } = postSlice.actions;

export default postSlice.reducer;
