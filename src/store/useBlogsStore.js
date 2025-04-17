import {create} from "zustand";

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
}));

export default useBlogsStore;