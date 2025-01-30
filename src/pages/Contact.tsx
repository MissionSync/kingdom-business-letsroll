import { ContactForm } from "@/components/ContactForm"

const Contact = () => {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">
            Contact Us
          </h1>
          <p className="text-muted-foreground mb-8 text-center">
            We'd love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default Contact