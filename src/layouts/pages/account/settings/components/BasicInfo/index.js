/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @material-ui core components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Settings page components
import FormField from "layouts/pages/account/components/FormField";

// Data
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";

function BasicInfo() {
  // return (
  //   <Card id="basic-info" sx={{ overflow: "visible" }}>
  //     <MDBox p={3}>
  //       <MDTypography variant="h5">Información Básica</MDTypography>
  //     </MDBox>
  //     <MDBox component="form" pb={3} px={3}>
  //       <Grid container spacing={3}>
  //         <Grid item xs={12} sm={6}>
  //           <FormField label="Nombres" />
  //         </Grid>
  //         <Grid item xs={12} sm={6}>
  //           <FormField label="Apellidos" />
  //         </Grid>
  //         <Grid item xs={12}>
  //           <Grid container spacing={3}>
  //             <Grid item xs={12} sm={4}>
  //               <Autocomplete
  //                 defaultValue="Dependiente"
  //                 options={selectData.tipo}
  //                 renderInput={(params) => (
  //                   <FormField {...params} label="Tipo" InputLabelProps={{ shrink: true }} />
  //                 )}
  //               />
  //             </Grid>
  //             <Grid item xs={12} sm={8}>
  //               <FormField label="Email" inputProps={{ type: "email" }} />
  //             </Grid>
  //           </Grid>
  //         </Grid>
  //       </Grid>
  //     </MDBox>
  //   </Card>
  // );
}

export default BasicInfo;
