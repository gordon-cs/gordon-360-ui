const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index} role="tabpanel">
      {children}
    </div>
  );
};

export { TabPanel };
