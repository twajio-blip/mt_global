import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { webLinkCategories } from '../data/weblinks';

export function WebLinks() {
  return (
    <div className="rounded-mcaa border border-mcaa-border bg-white p-4 sm:p-5">
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'Weblink' }]} title="Important Web Links" />

      <p className="mb-4 text-[15.5px] leading-relaxed text-mcaa-text">
        Official websites of the customs, port, government and trade organisations most frequently required by member
        firms. Links open the respective official website in a new tab.
      </p>

      {webLinkCategories.map((group) =>
      <section key={group.category} className="mb-5 last:mb-0">
          <h2 className="mb-2 border-b border-mcaa-border pb-1.5 text-[17px] font-semibold text-mcaa-navy">
            {group.category}
          </h2>
          <ul className="divide-y divide-mcaa-border">
            {group.links.map((link) =>
          <li key={link.name}>
                <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-2 py-2.5">
              
                  <ExternalLinkIcon className="mt-1 h-4 w-4 shrink-0 text-mcaa-blue" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[15px] font-medium text-mcaa-navy group-hover:text-mcaa-blue group-hover:underline">
                      {link.name}
                    </span>
                    <span className="block text-[13.5px] leading-snug text-mcaa-muted">{link.description}</span>
                  </span>
                </a>
              </li>
          )}
          </ul>
        </section>
      )}
    </div>);

}