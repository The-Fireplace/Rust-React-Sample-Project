use actix_web::{HttpResponse, post};
use actix_web::Responder;
use serde::Serialize;

#[derive(Serialize)]
struct Response {
    success: bool,
    message: String,
}

#[post("/some_endpoint")]
pub async fn some_endpoint() -> impl Responder {
    HttpResponse::Ok().json(Response {
        success: true,
        message: "Hello API User!".to_owned(),
    })
}