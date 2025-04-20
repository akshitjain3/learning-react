export const menus = [{
  label: "India",
  to: "/assets/images/india.png",
  children: [
    {
      label: "Rajasthan",
      to: "/assets/images/rajasthan.png",
      children: [
        {
          label: "Jaipur",
          to: "/assets/images/jaipur.png",
        },
        {
          label: "Udaipur",
          to: "/assets/images/udaipur.png",
        },
      ],
    },
    {
      label: "Kerala",
      to: "/assets/images/kerala.png",
      children: [
        {
          label: "Alleppey",
          to: "/assets/images/alleppey.png",
        },
      ],
    },
  ],
},
{
  label: "Japan",
  to: "/assets/images/japan.png",
  children: [
    {
      label: "Tokyo",
      to: "/assets/images/tokyo.png",
    },
    {
      label: "Kyoto",
      to: "/assets/images/kyoto.png",
    },
  ],
},
];
  
  export default menus;