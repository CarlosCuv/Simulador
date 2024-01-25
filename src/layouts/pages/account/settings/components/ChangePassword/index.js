/* eslint-disable prettier/prettier */
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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MDBadge from "components/MDBadge";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import jsPDF from "jspdf";
// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import Autocomplete from "@mui/material/Autocomplete";
import FormField from "layouts/pages/account/components/FormField";
import TableCell from "layouts/pages/account/settings/components/TableCell";
import { useState } from "react";
import selectData from "layouts/pages/account/settings/components/BasicInfo/data/selectData";
import { number } from "prop-types";
import { LegendToggle } from "@mui/icons-material";

function ChangePassword() {
  const variable = useState(0);
  const [ingresos, setIngresos] = useState(0);
  const [ventas, setVentas] = useState(0);
  const [servicios, setServicios] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [valorEntrada, setValorEntrada] = useState(0);
  const [valorSaldo, setValorSaldo] = useState(valorTotal - valorEntrada);
  const [tasa, setTasa] = useState(0);
  const [plazo, setPlazo] = useState(240);
  const [gastosAdministrativos, setGastosAdministrativos] = useState(0);
  const [gastosLegales, setGastosLegales] = useState(0);
  const [avaluo, setAvaluo] = useState(0);
  const [solca, setSolca] = useState(0);
  const [seguro, setSeguro] = useState(0);
  const [fecha, setFecha] = useState("");
  const [tipo, setTipo] = useState(selectData.tipo[0]);
  const [tipoVenta, settipoVenta] = useState(selectData.subtipo[0]);
  const [tipoInputValue, setTipoInputValue] = useState("");
  const [subtipo, setSubtipo] = useState("");
  //const [tablaAmortizacion, setTablaAmortizacion] = useState("");
  const [tabla, setTabla] = useState([]);

  const [institucion, setInstitucion] = useState(selectData.institucion[7]);
  const [institucionValue, setInstitucionValue] = useState("");

  const [opcion1, setOpcion1] = useState(0);
  const [opcion2, setOpcion2] = useState(0);
  const [opcion3, setOpcion3] = useState(0);

  const [recomendacion, setRecomendacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const [proyecto,setProyecto] = useState(selectData.proyecto[0]);



  var monthArrayNames = [];
  monthArrayNames[0] = "Enero";
  monthArrayNames[1] = "Febrero";
  monthArrayNames[2] = "Marzo";
  monthArrayNames[3] = "Abril";
  monthArrayNames[4] = "Mayo";
  monthArrayNames[5] = "Junio";
  monthArrayNames[6] = "Julio";
  monthArrayNames[7] = "Agosto";
  monthArrayNames[8] = "Septiembre";
  monthArrayNames[9] = "Octubre";
  monthArrayNames[10] = "Noviembre";
  monthArrayNames[11] = "Diciembre";

  Date.isLeapYear = function (year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  Date.getDaysInMonth = function (year, month) {
    return [31, Date.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  };

  Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
  };

  Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
  };

  Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
  };

  function PMT(ir, np, pv, fv, type) {
    var pmt, pvif;

    fv || (fv = 0);
    type || (type = 0);

    if (ir === 0) return -(pv + fv) / np;

    pvif = Math.pow(1 + ir, np);
    pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

    if (type === 1) pmt /= 1 + ir;

    return pmt;
  }

  const handleCalcular = () => {
    let tasaEfectiva = tasa / 100 / 12;
    let valorS = valorTotal - valorEntrada;
    let tempValor =
      Number(valorS) +
      Number(gastosAdministrativos) +
      Number(gastosLegales) +
      Number(avaluo) +
      Number(solca);
    let resp = PMT(tasaEfectiva, plazo, -tempValor);
    let resp1 = PMT(tasaEfectiva, 120, -tempValor);
    let resp2 = PMT(tasaEfectiva, 180, -tempValor);
    let resp3 = PMT(tasaEfectiva, 240, -tempValor);

    setOpcion1(resp1.toFixed(2));
    setOpcion2(resp2.toFixed(2));
    setOpcion3(resp3.toFixed(2));

    let tempIngreso = (Number(resp) + Number(seguro)) / 0.3;
    setValorSaldo(valorS);
    setIngresos(tempIngreso.toFixed(2));
    let tempVentas = (tempIngreso * 100) / 30;
    setVentas(tempVentas.toFixed(2));
    let tempServicios = (tempIngreso * 100) / 40;
    setServicios(tempServicios.toFixed(2));
    calcTablaAmortizacion(resp);
  };

  function calcTablaAmortizacion(resp) {
    let valorS = valorTotal - valorEntrada;
    let tempValor =
      Number(valorS) +
      Number(gastosAdministrativos) +
      Number(gastosLegales) +
      Number(avaluo) +
      Number(solca);
    let SaldoCapital = tempValor;
    var tempFecha = new Date(fecha);
    var month = monthArrayNames[tempFecha.getMonth()];
    var year = tempFecha.getFullYear();

    var fullDate = `${month}/${year}`;
    var tablaTemp = [];
    let n = 0;
    for (let i = 0; i < plazo; i++) {
      n = i + 1;
      let tempInteres = (SaldoCapital * (tasa / 100) * 30) / 360;
      let capital = resp - tempInteres;
      tablaTemp.push({
        num: n,
        fechaPago: fullDate,
        saldoCapital: SaldoCapital.toFixed(2),
        interes: tempInteres.toFixed(2),
        capital: capital.toFixed(2),
        cuota: resp.toFixed(2),
      });

      SaldoCapital = SaldoCapital - capital;
      tempFecha = tempFecha.addMonths(1);
      month = monthArrayNames[tempFecha.getMonth()];
      year = tempFecha.getFullYear();
      fullDate = `${month}/${year}`;
    }

    console.log(tablaTemp);
    setTabla(tablaTemp);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card id="basic-info" sx={{ overflow: "visible" }}>
          <MDBox p={3}>
            <MDTypography variant="h5">Información Básica</MDTypography>
          </MDBox>
          <MDBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <MDInput
                  fullWidth 
                  label="Nombres"
                  inputProps={{
                    // shrink: true,
                    type:"text",
                    value: nombre,
                    onChange: (e) => setNombre(e.target.value),
                  }} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <MDInput 
                  fullWidth
                  label="Apellidos"
                  inputProps={{
                    type:"text",
                    value: apellido,
                    onChange: (e) => setApellido(e.target.value),
                  }} 
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      defaultValue="Dependiente"
                      disableClearable
                      options={selectData.tipo}
                      value={tipo}
                      onChange={(event, newValue) => {
                        setTipo(newValue);
                      }}
                      inputValue={tipoInputValue}
                      onInputChange={(event, newInputValue) => {
                        setTipoInputValue(newInputValue);
                      }}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          label="Situación Laboral"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {tipo == "Independiente" ? (
                    <Grid item xs={12} sm={6}>
                      <Autocomplete
                        disableClearable  
                        defaultValue="Servicios"
                        options={selectData.subtipo}
                        value={tipoVenta}
                        onChange={(event, newValue) => {
                          settipoVenta(newValue);
                        }}
                        renderInput={(params) => (
                          <FormField
                            {...params}
                            label="Venta"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disableClearable
                      defaultValue="0"
                      options={selectData.institucion}
                      value={institucion}
                      onChange={(event, newValue) => {
                        setInstitucion(newValue);
                        setTasa(newValue.id);
                      }}
                      inputValue={institucionValue}
                      onInputChange={(event, newInputValue) => {
                        setInstitucionValue(newInputValue);
                      }}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          label="Institución Financiera"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormField label="Email" inputProps={{ type: "email" }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Autocomplete
                      disableClearable
                      defaultValue="Ciudad Celeste"
                      options={selectData.proyecto}
                      value={proyecto}
                      onChange={(event, newValue) => {
                        setProyecto(newValue);
                      }}
                      renderInput={(params) => (
                        <FormField
                          {...params}
                          label="Proyecto"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card id="datosbien">
          <MDBox p={3}>
            <MDTypography variant="h5">Datos del Bien</MDTypography>
          </MDBox>
          <MDBox component="form" pb={3} px={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Valor Total"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: valorTotal,
                        onChange: (e) => setValorTotal(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Valor de la Entrada"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: valorEntrada,
                        onChange: (e) => setValorEntrada(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Valor Saldo"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: valorSaldo,
                        //onChange: (e) => setValorSaldo(e.target.value),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Tasa"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: tasa,
                        onChange: (e) => setTasa(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Plazo"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: plazo,
                        onChange: (e) => setPlazo(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Gastos Administrativos"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: gastosAdministrativos,
                        onChange: (e) => setGastosAdministrativos(e.target.value),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Gastos Legales"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: gastosLegales,
                        onChange: (e) => setGastosLegales(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Avalúo"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: avaluo,
                        onChange: (e) => setAvaluo(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Solca"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: solca,
                        onChange: (e) => setSolca(e.target.value),
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Seguros"
                      inputProps={{
                        type: "number",
                        autoComplete: "",
                        value: seguro,
                        onChange: (e) => setSeguro(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDInput
                      fullWidth
                      label="Fecha primer pago"
                      inputProps={{
                        type: "date",
                        autoComplete: "",
                        value: fecha,
                        onChange: (e) => setFecha(e.target.value),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <MDButton variant="gradient" color="dark" size="small" onClick={handleCalcular}>
                      Calcular
                    </MDButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card id="Resumen" sx={{ overflow: "visible" }}>
          <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <MDTypography variant="h5">Resumen</MDTypography>
            <MDBadge variant="contained" color="success" badgeContent="enabled" container />
          </MDBox>
          <MDBox p={3}>
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <MDTypography variant="body2" color="text">
                Ingresos Requeridos
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {ingresos}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
            <Divider />
            {tipo == "Independiente" ? (
              <div>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  flexDirection={{ xs: "column", sm: "row" }}
                >
                  <MDTypography variant="body2" color="text">
                    Valores mensuales a declarar SRI (Compra/venta de Productos)
                  </MDTypography>
                  <MDBox
                    display="flex"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
                      <MDTypography variant="button" color="text" fontWeight="regular">
                        {ventas}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
                <Divider />
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                >
                  <MDTypography variant="body2" color="text">
                    Valores mensuales a declarar SRI (Servicios Profesionales)
                  </MDTypography>
                  <MDBox
                    display="flex"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                  >
                    <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
                      <MDTypography variant="button" color="text" fontWeight="regular">
                        {servicios}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </div>
            ) : (
              <div></div>
            )}
            <Divider />
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
            >
              <MDTypography variant="body2" color="text">
                120 meses
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {opcion1}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
            <Divider />
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
            >
              <MDTypography variant="body2" color="text">
                180 meses
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {opcion2}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
            <Divider />
            <MDBox
              display="flex"
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
            >
              <MDTypography variant="body2" color="text">
                240 meses
              </MDTypography>
              <MDBox
                display="flex"
                alignItems={{ xs: "flex-start", sm: "center" }}
                flexDirection={{ xs: "column", sm: "row" }}
              >
                <MDBox mx={{ xs: 0, sm: 2 }} mb={{ xs: 1, sm: 0 }}>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    {opcion3}
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
            <Divider />
            <Grid item xs={12}>
                <MDInput
                  fullWidth
                  label="Recomendaciones"
                  inputProps={{
                    type: "text",
                    value: recomendacion,
                    onChange: (e) => setRecomendacion(e.target.value),
                  }}
                />
            </Grid>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card id="tabla">
          <MDBox p={3} lineHeight={1}>
            <MDBox mb={1}>
              <MDTypography variant="h5">Tabla</MDTypography>
            </MDBox>
            <MDTypography variant="button" color="text">
              Tabla de amortización
            </MDTypography>
          </MDBox>
          <MDBox pb={3} px={3}>
            <MDBox minWidth="auto" sx={{ overflow: "scroll" }}>
              <Table sx={{ minWidth: "36rem" }}>
                <MDBox component="thead">
                  <TableRow>
                    <TableCell width="center" padding={[1.5, 6, 1.5, 6]}>
                      Cuota
                    </TableCell>
                    <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                      Fecha
                    </TableCell>
                    <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                      Saldo Capial
                    </TableCell>
                    <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                      Interés
                    </TableCell>
                    <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                      Capital
                    </TableCell>
                    <TableCell align="center" padding={[1.5, 6, 1.5, 6]}>
                      Total Dividendo
                    </TableCell>
                  </TableRow>
                </MDBox>
                <TableBody>
                  {tabla.map((row) => (
                    <TableRow key={row.num}>
                      <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                        {row.num}
                      </TableCell>
                      <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                        {row.fechaPago}
                      </TableCell>
                      <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                        {row.saldoCapital}
                      </TableCell>
                      <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                        {row.interes}
                      </TableCell>
                      <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                        {row.capital}
                      </TableCell>
                      <TableCell align="center" padding={[1, 1, 1, 0.5]}>
                        {row.cuota}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card id="impresion">
          <MDBox
            pr={3}
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <MDBox p={3} lineHeight={1}>
              <MDBox mb={1}>
                <MDTypography variant="h5">Impresión</MDTypography>
              </MDBox>
             
              
            </MDBox>
            <MDBox display="flex" flexDirection={{ xs: "column", sm: "row" }}>
              <MDBox ml={{ xs: 0, sm: 1 }} mt={{ xs: 1, sm: 0 }}>
                <MDButton
                  variant="gradient"
                  color="error"
                  sx={{ height: "100%" }}
                  onClick={Exportar}
                >
                  PDF
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  );

  async function Exportar() {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);


    const fechaActual = new Date().toLocaleString();

    

    
    doc.setFont("arial", "bold");
    let logo = 'villadelrey';

    if(proyecto == "Ciudad Celeste")
      logo = 'ciudadceleste';
    else if(proyecto == "La Joya")
      logo = 'lajoya'

    doc.addImage(require("assets/images/logo_"+logo+".png"), 25, 8, 110, 70);
    doc.setFontSize(12);
    doc.setLineWidth(1);
    doc.line(25, 85, 570, 85);
    doc.text("INFORMACIÓN PRECALIFICACIÓN", 300, 100, null, null, "center");
    doc.setLineWidth(1);
    doc.line(25, 105, 570, 105);


    doc.setFontSize(10);
    doc.setFont("arial", "normal");
    doc.text("Pag. 1", 555, 35, null, null, "right");
    doc.text(fechaActual, 555, 45, null, null, "right");

    
    doc.setFont("arial", "bold");
    doc.text("Institucion Financiera: ", 30, 155, null, null, "left");

    //doc.text(solicitud.Equipo.Nombre ? solicitud.Equipo.Nombre.substring(0, 33) : "", 90, 155, null, null, "left");
    doc.setFont("arial", "normal");
    console.log(institucion);
    doc.text(institucion.label, 300, 155, null, null, "left");
    //doc.text(solicitud.Equipo.Marca ? solicitud.Equipo.Marca : "", 350, 155, null, null, "left");
    // doc.setFont("arial", "bold");
    // doc.text("SERIE: ", 450, 155, null, null, "left");
    // doc.setFont("arial", "normal");
    //doc.text(solicitud.Equipo.Serie ? solicitud.Equipo.Serie : "", 490, 155, null, null, "left");
    doc.setFont("arial", "bold");
    doc.text("Nombre del cliente: ", 30, 195, null, null, "left");
    doc.setFont("arial", "normal");
    console.log(nombre);
    console.log(apellido);
    doc.text(nombre + ' ' + apellido, 300, 195, null, null, "left");

    doc.setFont("arial", "bold");
    doc.text("Situación Laboral: ", 30, 215, null, null, "left");
    doc.setFont("arial", "normal");
    doc.text(tipo, 300, 215, null, null, "left");

    doc.setFont("arial", "bold");
    doc.text("Venta de Productos o Servicios: ", 30, 235, null, null, "left");
    doc.setFont("arial", "normal");
    doc.text(tipoVenta, 300, 235, null, null, "left");

    doc.setFont("arial", "bold");
    doc.text("Valor del Bien: ", 30, 255, null, null, "left");
    doc.setFont("arial", "normal");
    doc.text('$ '+valorTotal, 300, 255, null, null, "left");

    doc.setFont("arial", "bold");
    doc.text("Entrada: ", 30, 275, null, null, "left");
    doc.setFont("arial", "normal");
    doc.text('$ '+valorEntrada, 300, 275, null, null, "left");

    doc.setFont("arial", "bold");
    doc.text("Saldo: ", 30, 295, null, null, "left");
    doc.setFont("arial", "normal");
    doc.text('$ '+valorSaldo.toString(), 300, 295, null, null, "left");

    doc.setFont("arial", "bold");
    doc.text("Ingresos Requeridos: ", 30, 315, null, null, "left");
    doc.setFont("arial", "normal");
    doc.text('$ '+ingresos.toString(), 300, 315, null, null, "left");

    doc.setFont("arial", "bold");
    doc.text("Saldo a Financiar: ", 30, 345, null, null, "left");
    doc.setFont("arial", "normal");
    doc.text('$ '+valorSaldo.toString(), 300, 345, null, null, "left");


    doc.text("120 meses: ", 30, 365, null, null, "left");
    doc.text('$ '+opcion1.toString(), 300, 365, null, null, "left");

    doc.text("180 meses: ", 30, 385, null, null, "left");
    doc.text('$ '+opcion2.toString(), 300, 385, null, null, "left");

    doc.text("240 meses: ", 30, 405, null, null, "left");
    doc.text('$ '+opcion3.toString(), 300, 405, null, null, "left");

    doc.text("Recomendaciones al cliente: ", 30, 455, null, null, "left");
    doc.text(recomendacion, 300, 455, null, null, "left");

    doc.text("Ventas Mensuales a facturar ante el SRI: ", 30, 475, null, null, "left");
    doc.text(tipoVenta == "Producto"? '$ '+ventas.toString():'$ '+servicios.toString(), 300, 475, null, null, "left");
    
    doc.setFont("arial", "bold");
    doc.text("Observación: ", 50, 760, null, null, "left");
    doc.setFont("arial", "normal",10);
 
    doc.text("Este simulador tiene un carácter informativo y no constituye una precalificación bancaria. Su propósito es", 110, 760, null, null, "justify");
    doc.text("proporcionar al usuario la información necesaria sobre los ingresos requeridos para obtener un crédito hipotecario. Para", 50, 770, null, null, "justify"); 
    doc.text("lograrlo, es esencial contar con la documentación adecuada que respalde la verificación de los ingresos, de acuerdo con", 50, 780, null, null, "justify"); 
    doc.text("las políticas y tasas de interés vigentes al momento de la calificación definitiva. Se aconseja evitar la presencia de deudas", 50, 790, null, null, "justify"); 
    doc.text("vencidas en el sistema financiero.", 50, 800, null, null, "justify"); 

    doc.setLineWidth(1);
    doc.line(40, 750, 555, 750);
    doc.line(40, 805, 555, 805);

    doc.line(40, 750, 40, 805);
    doc.line(555, 750, 555, 805);

    doc.save("export.pdf");
  }
}

export default ChangePassword;
