use actix_web::{App, HttpServer, middleware, web};
use actix_web::middleware::TrailingSlash;

mod api;
mod webclient;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let server = HttpServer::new(move || {
        App::new()
            .wrap(middleware::NormalizePath::new(TrailingSlash::Trim))
            .service(web::scope("/api").configure(api::configure))
            .configure(webclient::configure)
    });

    server
        .bind("0.0.0.0:8080")?
        .run()
        .await
}
