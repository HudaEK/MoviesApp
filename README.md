# Cambios

## Recurso Movie (CRUD)
- Endpoints:
  - GET /movies — lista películas
  - GET /movies/:id — recupera una película individual
  - POST /movies — crea una película
  - PUT /movies/:id — actualiza una película
  - DELETE /movies/:id — elimina una película


## Recurso User
- Propósito: autenticación, autorización y propiedad de bookmarks/recursos
- Campos típicos: id, email (único), name, createdAt
- Endpoints:
  - GET /users — lista usuarios
  - GET /users/:id — recupera un usuario individual
  - POST /users — crea un usuario
  - PUT /users/:id — actualiza un usuario
  - DELETE /users/:id — elimina un usuario
- Seguridad: El email debe ser único.
- Relación: los usuarios tienen bookmarks; las acciones en los bookmarks requieren la identificación del usuario.

## Recurso Bookmark (modificaciones)
- Ahora referencia tanto user_id como movie_id (claves externas)
- Unicidad aplicada: un bookmark por usuario por película
- Endpoints:
  - GET /bookmarks/user/:userId — lista bookmarks de un usuario (soporta filtrado por user_id)
  - POST /bookmarks — crea un bookmark (requiere user_id y movie_id en el body)
  - DELETE /bookmarks/:id — elimina un bookmark por ID
- Campos: id, user, movie, addeddate

