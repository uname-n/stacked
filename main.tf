module "service" {
  source = "./modules/service"
}

output "name" {
  value = module.service.name
}