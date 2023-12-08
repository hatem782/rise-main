export const menu = [
  {
    label: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: "pi pi-fw pi-chart-bar",
        to: "/dashboard/",
      },
    ],
  },

  {
    label: "Companies & Jobs",
    items: [
      {
        label: "Companies",
        icon: "pi pi-fw pi-building",
        to: "/dashboard/companies",
      },
      {
        label: "Jobs",
        icon: "pi pi-fw pi-desktop",
        to: "/dashboard/jobs",
      },
    ],
  },

  {
    label: "Talents",
    items: [
      {
        label: "Talents",
        icon: "pi pi-fw pi-id-card",
        to: "/dashboard/talents",
      },
    ],
  },

  {
    label: "Interactions & Communication",
    items: [
      {
        label: "FeedBacks",
        icon: "pi pi-fw pi-thumbs-up",
        to: "/dashboard/feedbacks",
      },
      {
        label: "Enrolls",
        icon: "pi pi-fw pi-send",
        to: "/dashboard/enrolls",
      },
      // {
      //   label: "Conversations",
      //   icon: "pi pi-fw pi-comments",
      //   to: "/dashboard/conversation",
      // },
      {
        label: "Mailing",
        icon: "pi pi-fw pi-envelope",
        to: "/dashboard/mailing",
      },
    ],
  },
  {
    label: "Transaction & Bills",
    items: [
      {
        label: "Transaction ",
        icon: "pi pi-fw pi-credit-card",
        to: "/dashboard/transaction",
      },
      {
        label: "Bills ",
        icon: "pi pi-fw pi-wallet",
        to: "/dashboard/bills",
      },
    ],
  },
];
