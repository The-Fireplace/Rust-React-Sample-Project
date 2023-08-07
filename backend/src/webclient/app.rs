use actix_web::{guard, web};
use super::page;

pub fn configure(cfg: &mut web::ServiceConfig)
{
    cfg.service(web::resource("").to(page::app::respond));
    cfg.default_service(web::route()
        .guard(guard::Get())
        .to(page::app::respond_not_found)
    );
}