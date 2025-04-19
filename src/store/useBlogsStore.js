import { create } from "zustand";
import axios from "axios";
import apiUrl from "../utils/apiUrl";

const useBlogsStore = create((set) => ({
  blogs: [],
  myBlogs: [],


  setBlogs: (blogs) => set({ blogs }),
  setMyBlogs: (myBlogs) => set({ myBlogs }),


  addBlog: (newBlog) =>
    set((state) => ({
      blogs: [newBlog, ...state.blogs],
      myBlogs: [newBlog, ...state.myBlogs],
    })),


  removeBlog: (blogId) =>
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== blogId),
      myBlogs: state.myBlogs.filter((blog) => blog.id !== blogId),
    })),


  refreshBlogs: async () => {
    try {
      const response = await axios.get(`${apiUrl}/blogs`, {
        withCredentials: true,
      });
      set({ blogs: response.data.blogs });
    } catch (error) {
      console.error("Error refreshing blogs:", error);
    }
  },


  refreshMyBlogs: async () => {
    try {
      const response = await axios.get(`${apiUrl}/blogs/mine`, {
        withCredentials: true,
      });
      set({ myBlogs: response.data.blogs });
    } catch (error) {
      console.error("Error refreshing my blogs:", error);
    }
  },
}));

export default useBlogsStore;