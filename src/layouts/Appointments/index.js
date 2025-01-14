import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import MDSnackbar from "components/MDSnackbar";
import { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";

// Data
import appData from "layouts/Appointments/data/appData";

function Tables() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);

  const {
    columns,
    rows,
    editedProduct,
    handleFileChange,
    handleInputChange,
    handleSaveChanges,
    isModalOpen,
    isFileModalOpen,
    closeFileModal,
    handleCloseModal,
    notification,
    handleCloseNotification,
    handleUploadImage
  } = appData();
  
  const fetchAppointmentsStats = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        // TO DO
        "https://mediportal-api-production.up.railway.app/api/v1/appointments/stats",
        {
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        }
      );
      setLoading(false);
      setStats(response.data.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(
        // "https://mediportal-api-production.up.railway.app/api/v1/appointments/allAppointments",
        "https://pixelparts-dev-api.up.railway.app/api/v1/product/allProducts",
        {
          headers: { Authorization: `Bearer ${Cookies.get("authToken")}` },
        }
      );
      setAllAppointments(response.data.data.Appointments);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointmentsStats();
    fetchAllProducts();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={3} marginBottom={5}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="people"
                title="Total Products"
                count={
                  loading
                    ? "Loading..."
                    : Number(stats.completedappointments) +
                      Number(stats.scheduledappointments) +
                      Number(stats.cancelledappointments)
                }
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="timer"
                title="Scheduled Appointments"
                count={stats.scheduledappointments}
                color="warning"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="done"
                title="Completed Appointments"
                count={stats.completedappointments}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="block"
                title="Canceled Doctors"
                count={stats.cancelledappointments}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Products Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={false}
                  showTotalEntries
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />

{/* Modal for editing Products */}
<Dialog
  open={isModalOpen}
  onClose={handleCloseModal}
  TransitionComponent={Fade}
  TransitionProps={{ timeout: 500 }}
>
  <DialogTitle>Edit Product Details</DialogTitle>
  <DialogContent>
    {editedProduct && (
      <>
        <TextField
          name="productName"
          label="Product Name"
          value={editedProduct.productName}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="category"
          label="Category"
          value={editedProduct.category}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="manufacture"
          label="Manufacturer"
          value={editedProduct.manufacture}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="price"
          label="Price"
          type="number"
          value={editedProduct.price}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="stockQuantity"
          label="Stock Quantity"
          type="number"
          value={editedProduct.stockQuantity}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="specifications"
          label="Specifications"
          value={editedProduct.specifications}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          multiline
          rows={3}
        />
        <TextField
          name="releaseDate"
          label="Release Date"
          type="date"
          value={editedProduct.releaseDate}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          name="warrantyPeriod"
          label="Warranty Period (Months)"
          type="number"
          value={editedProduct.warrantyPeriod}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="offerPercentage"
          label="Offer Percentage"
          type="number"
          value={editedProduct.offerPercentage}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="overallRating"
          label="Overall Rating"
          type="number"
          value={editedProduct.overallRating}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          name="description"
          label="Description"
          value={editedProduct.description}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
          multiline
          rows={4}
        />
      </>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseModal} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleSaveChanges} color="primary">
      Save
    </Button>
  </DialogActions>
</Dialog>

  {/* File Modal */}
  <Dialog
    open={isFileModalOpen}
    onClose={closeFileModal}
    TransitionComponent={Fade}
    TransitionProps={{ timeout: 500 }}
  >
    <DialogTitle>Edit Product Image</DialogTitle>
    <DialogContent>
      {/* Product Fields */}
      <TextField
        name="image"
        label="Product Image"
        onChange={handleFileChange}
        fullWidth
        margin="dense"
        type="file"
        focused={true}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={closeFileModal} color="secondary">
        Cancel
      </Button>
      <Button onClick={handleUploadImage} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>

      {/* Notification Snackbar */}
      <MDSnackbar
        color={notification.severity}
        icon={notification.severity === "success" ? "check" : "error"}
        title={notification.severity === "success" ? "Success" : "Error"}
        content={notification.message}
        open={notification.open}
        onClose={handleCloseNotification}
        close={handleCloseNotification}
        bgWhite
      />
    </DashboardLayout>
  );
}

export default Tables;
