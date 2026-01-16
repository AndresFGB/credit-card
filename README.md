# Aplicación de tarejtas de crédito
La prática se realiz+o con .NET 8 y React 

Aplicación web para gestionar tarjetas de crédito, realizar pagos y visualizar el historial de transacciones.
## Stack
- **Backend:** .NET 8 (ASP.NET Core Web API) + EF Core + SQLite
- **Frontend:** React + TypeScript + Vite + TailwindCSS
- **Auth:** Login simple por credenciales (demo)
- 
La aplicación fue diseñada priorizando simplicidad, claridad y funcionalidad, teniendo en cuenta las limitaciones de tiempo propias de una prueba técnica.

**Backend**

El backend se desarrolló utilizando ASP.NET Core 8 y Entity Framework Core, con una base de datos SQLite generada directamente desde el código.
El modelo de datos se compone de tres entidades principales:
* User
* CreditCard
* Transaction

Las relaciones implementadas son de tipo uno a muchos:

* Un usuario puede tener múltiples tarjetas de crédito.
* Un usuario puede tener múltiples transacciones.
* Cada transacción está asociada a una tarjeta de crédito.

Debido a la simplicidad del dominio y a estas relaciones claras, no fue necesario implementar una arquitectura más compleja. El backend expone una API REST que centraliza las reglas de negocio, validaciones y persistencia de datos.

Las validaciones críticas (tarjeta válida, fondos suficientes, pertenencia al usuario) se realizan exclusivamente en el backend para garantizar la integridad de la información

**Frontend**

El frontend fue desarrollado con React, utilizando Vite como entorno de desarrollo y TailwindCSS para el diseño visual, aprovechando una plantilla base para agilizar la construcción de la interfaz debido a restricciones de tiempo.

La aplicación cuenta con un login simplificado, en el cual:
* Se solicita únicamente el username.
* Si el usuario no existe, se crea automáticamente.
* El userId se almacena en sessionStorage y se reutiliza durante toda la sesión.

Se implementó un servicio de autenticación encargado únicamente de gestionar y recuperar el userId desde la sesión, el cual es utilizado por los demás servicios para consumir la API.

**Estructura de la interfaz**

El frontend se organiza en cuatro páginas principales:
* Login
* Gestión de tarjetas
* Transacciones (cobros activos e historial)
* Historial de pagos
Además, se desarrollaron varios componentes reutilizables, como tarjetas, paneles con scroll y botones de acción, con el objetivo de mantener un código limpio y fácil de mantener.

**Cómo ejecutar el proyecto (local)**
